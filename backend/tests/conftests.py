import pytest
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from marketplace.users.models import User


@pytest.fixture
@pytest.mark.django_db
def user():
    email = "test_email@example.com"
    password = "test_password"
    user = User.objects.create(email=email, password=password)
    return user


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
@pytest.mark.django_db
def authenticated_client(user):
    token = Token.objects.create(user=user)
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
    return client
