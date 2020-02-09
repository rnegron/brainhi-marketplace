import uuid

from django.conf import settings
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from marketplace.providers.models import Provider


class Appointment(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE)

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    appointment_reason = models.TextField(max_length=260)

    patient_name = models.CharField(max_length=100)
    patient_insurance = models.CharField(max_length=100)
    patient_gender = models.CharField(max_length=10, choices=Provider.GENDER_CHOICES)
    patient_date_of_birth = models.DateField()
    patient_phone_number = PhoneNumberField()
