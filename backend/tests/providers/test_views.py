import pytest
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse

from marketplace.appointments.models import Appointment
from marketplace.providers import factories, models, serializers


@pytest.mark.django_db
def test_can_search_by_name(api_client):
    url = reverse("provider-search")

    factories.ProviderFactory.create_batch(10)

    provider = factories.ProviderFactory.create(name="Dr. Test")
    assert models.Provider.objects.count() == 11

    response = api_client.get(url, {"search_term": "Dr. Test"})

    assert response.status_code == status.HTTP_200_OK

    data = response.data["results"]
    assert len(data) == 1
    assert data[0]["id"] == str(provider.id)
    assert data[0]["address"] == provider.address


@pytest.mark.django_db
def test_can_search_by_specialty(api_client):
    url = reverse("provider-search")

    factories.ProviderFactory.create_batch(10)

    provider = factories.ProviderFactory.create(specialty="Testing-ology")

    assert models.Provider.objects.count() == 11
    response = api_client.get(url, {"search_term": "Testing"})

    assert response.status_code == status.HTTP_200_OK

    data = response.data["results"]
    assert len(data) == 1
    assert data[0]["id"] == str(provider.id)
    assert data[0]["address"] == provider.address

    response = api_client.get(url, {"search_term": "Testing-ology"})

    assert response.status_code == status.HTTP_200_OK

    data = response.data["results"]
    assert len(data) == 1
    assert data[0]["id"] == str(provider.id)
    assert data[0]["address"] == provider.address


@pytest.mark.django_db
def test_can_search_by_address(api_client):
    url = reverse("provider-search")

    factories.ProviderFactory.create_batch(10)

    provider = factories.ProviderFactory.create(address="Testing Road, TEST")

    assert models.Provider.objects.count() == 11
    response = api_client.get(url, {"search_term": "Testing"})

    assert response.status_code == status.HTTP_200_OK

    data = response.data["results"]
    assert len(data) == 1
    assert data[0]["id"] == str(provider.id)
    assert data[0]["address"] == provider.address


def test_search_returns_error(api_client):
    url = reverse("provider-search")

    response = api_client.get(url, {"wrong_field": "abc"})

    assert response.status_code == 400
    assert "This field may not be null." == str(
        response.data["errors"]["search_term"][0]
    )


@pytest.mark.django_db
def test_can_create_appointment(api_client):
    provider = factories.ProviderFactory.create(specialty="Testing-ology")

    url = reverse("provider-appointment", kwargs={"pk": provider.pk})

    response = api_client.post(
        url,
        {
            "start_time": "2020-02-10T00:00:00Z",
            "appointment_reason": "I don't feel so good, Doctor",
            "patient_name": "My Patient",
            "patient_insurance": "The Best Insurance",
            "patient_gender": "MALE",
            "patient_date_of_birth": "2000-02-10",
            "patient_phone_number": "7877877878",
        },
    )

    assert response.status_code == 201
    appointment_created = Appointment.objects.first()

    assert response.json() == {"results": {"appointment_id": str(appointment_created.pk)}}


@pytest.mark.django_db
def test_cannot_create_appointment_with_no_data(api_client):
    provider = factories.ProviderFactory.create(specialty="Testing-ology")

    url = reverse("provider-appointment", kwargs={"pk": provider.pk})

    response = api_client.post(url, {})

    assert response.status_code == 400


@pytest.mark.django_db
def test_cannot_create_appointment_with_no_data(api_client):
    provider = factories.ProviderFactory.create(specialty="Testing-ology")

    url = reverse("provider-appointment", kwargs={"pk": provider.pk})

    response = api_client.post(
        url,
        {
            "patient_name": None,
            "patient_insurance": None,
            "patient_gender": None,
            "patient_date_of_birth": None,
            "patient_phone_number": None,
        },
    )

    assert response.status_code == 400
