import random

import factory
from factory.django import DjangoModelFactory

from .models import Provider

GENDER_CHOICES = ["male", "female", "other", "n/a"]


def getNPI():
    return "".join([str(random.randint(0, 9)) for i in range(9)])


class ProviderFactory(DjangoModelFactory):
    class Meta:
        model = Provider

    name = factory.Faker("name")
    provider_id = factory.LazyAttribute(lambda _: getNPI())
    specialty = factory.Faker("job")
    adddress = factory.Faker("address")
    phone_number = factory.Faker("phone_number")
    gender = random.choice(GENDER_CHOICES)
    bio = factory.Faker("text")
