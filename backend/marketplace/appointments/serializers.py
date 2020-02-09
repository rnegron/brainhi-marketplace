from rest_framework import serializers

from . import models


class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Appointment
        fields = (
            "provider_id",
            "start_time",
            "end_time",
            "appointment_reason",
            "patient_name",
            "patient_insurance",
            "patient_gender",
            "patient_date_of_birth",
            "patient_phone_number",
        )
