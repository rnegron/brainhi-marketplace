import uuid

from django.conf import settings
from django.db import models


class Appointment(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    provider_id = models.CharField(max_length=10, blank=True)

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    appointment_reason = models.TextField()

    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
