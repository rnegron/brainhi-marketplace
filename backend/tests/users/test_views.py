import pytest
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse

from marketplace.users.factories import UserFactory


@pytest.mark.django_db
def test_can_register(api_client):
    """User registration succeeds with valid email, password, and password confirmation"""
    url = reverse("user-list")

    response = api_client.post(
        url,
        {
            "email": "test@example.com",
            "password": "test_password123",
            "re_password": "test_password123",
        },
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["email"] == "test@example.com"


@pytest.mark.django_db
def test_register_passwords_have_to_match(api_client):
    """User registration fails if password and confirmation dont match."""
    url = reverse("user-list")

    response = api_client.post(
        url,
        {
            "email": "test@example.com",
            "password": "test_password123",
            "re_password": "test_password_wrong",
        },
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    error = response.data["non_field_errors"][0]
    assert str(error) == "The two password fields didn't match."
    assert error.code == "password_mismatch"


@pytest.mark.django_db
def test_cant_register_if_email_not_unique(api_client):
    """User registration fails with existing user email"""
    UserFactory.create(email="existing@example.com")

    url = reverse("user-list")

    response = api_client.post(
        url,
        {
            "email": "existing@example.com",
            "password": "test_password123",
            "re_password": "test_password123",
        },
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    error = response.data["email"][0]
    assert str(error) == "user with this email address already exists."
    assert error.code == "unique"


@pytest.mark.django_db
def test_cant_register_without_confirming_password(api_client):
    """User registration fails without confirming password"""
    url = reverse("user-list")

    response = api_client.post(
        url, {"email": "test@example.com", "password": "test_password123"}
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    error = response.data["re_password"][0]
    assert str(error) == "This field is required."


@pytest.mark.django_db
def test_can_login(api_client):
    """Login succeeds for activated user with valid user email and password"""
    url = reverse("login")

    new_user = UserFactory.create(email="new_user@example.com")

    new_user.set_password("new_user_password")
    new_user.save()

    response = api_client.post(
        url, {"email": new_user.email, "password": "new_user_password"}
    )

    assert response.status_code == status.HTTP_200_OK
    assert "auth_token" in response.data.keys()


@pytest.mark.django_db
def test_can_logout(user, api_client):
    """Verify logging out changes token status from authorized to unauthorized"""
    logout_url = reverse("logout")
    user_info_url = reverse("user-me")

    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    # verify logged in
    info_response_before = api_client.get(user_info_url)
    assert info_response_before.status_code == status.HTTP_200_OK

    logout_response = api_client.post(logout_url)
    assert logout_response.status_code == status.HTTP_204_NO_CONTENT

    # Try to list an endpoint
    info_response_after = api_client.get(user_info_url)
    assert info_response_after.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_cant_login_without_account(api_client):
    """Login fails with missing credentials"""
    url = reverse("login")

    response = api_client.post(url)
    assert response.status_code == 400

    error = response.data["non_field_errors"][0]
    assert error.code == "invalid_credentials"


@pytest.mark.django_db
def test_cant_login_with_wrong_password(api_client):
    """Login fails with incorrect password"""
    url = reverse("login")

    new_user = UserFactory.create(email="new_user@example.com")

    new_user.set_password("new_user_password")
    new_user.save()

    response = api_client.post(
        url, {"email": new_user.email, "password": "wrong_password"}
    )
    assert response.status_code == 400

    error = response.data["non_field_errors"][0]
    assert error.code == "invalid_credentials"


@pytest.mark.django_db
def test_can_get_own_user_info(user, api_client):
    """Authenticated user can fetch endpoint 'user-me', utilized for other tests."""
    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    url = reverse("user-me")
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data["email"] == user.email


@pytest.mark.django_db
def test_authorized_user_can_change_password(user, api_client):
    """Authenticated user can change their password. Token is changed and new password allows login."""
    user_url = reverse("user-me")
    set_password_url = reverse("user-set-password")
    login_url = reverse("login")

    user.set_password("first_password")
    user.save()

    token = Token.objects.create(user=user)
    api_client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    response = api_client.post(
        set_password_url,
        {
            "current_password": "first_password",
            "new_password": "second_password",
            "re_new_password": "second_password",
        },
    )
    assert response.status_code == 204

    # token changes
    response = api_client.get(user_url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    # removes old token
    api_client.credentials()

    response = api_client.post(
        login_url, {"email": user.email, "password": "second_password"}
    )

    assert response.status_code == status.HTTP_200_OK
