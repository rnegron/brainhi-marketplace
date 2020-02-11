import pytest

from marketplace.providers import serializers


@pytest.mark.django_db
def test_is_valid():
    serializer = serializers.ProviderSerializer(
        data=dict(
            name="Test Provider",
            provider_id="1234567890",
            specialty="Mango Eater",
            adddress="123 Constitution Drive",
            phone_number="+17877877878",
            gender="MALE",
            bio="I am a test which should test the thing I am testing",
        )
    )

    assert serializer.is_valid()
