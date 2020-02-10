import random

import factory
from factory.django import DjangoModelFactory

from .models import Provider

GENDER_CHOICES = ["MALE", "FEMALE", "OTHER", "PREFER NOT TO SAY"]


def getRandomDigitString(n):
    return "".join([str(random.randint(0, 9)) for i in range(n)])


def getNPI():
    return getRandomDigitString(9)


def getPhone():
    return f"787-{getRandomDigitString(3)}-{getRandomDigitString(4)}"


class ProviderFactory(DjangoModelFactory):
    class Meta:
        model = Provider

    name = factory.Faker("name")
    provider_id = getNPI()
    specialty = factory.Faker("job")
    address = factory.Faker("address")
    phone_number = getPhone()
    gender = random.choice(GENDER_CHOICES)
    bio = factory.Faker("text", max_nb_chars=500)
