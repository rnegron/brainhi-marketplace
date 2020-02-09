from rest_framework import serializers

from . import models


class AppointmentsSerializer(serializers.Serializer):
    class Meta:
        model = models.Appointment
        fields = (
            "provider_id",
            "start_time",
            "end_time",
            "appointment_reason",
            "patient",
        )
