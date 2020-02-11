from rest_framework import serializers

from . import models


class AppointmentIncomingDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Appointment
        fields = (
            "start_time",
            "appointment_reason",
            "patient_name",
            "patient_insurance",
            "patient_gender",
            "patient_date_of_birth",
            "patient_phone_number",
        )


class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Appointment
        fields = (
            "provider",
            "start_time",
            "end_time",
            "appointment_reason",
            "patient_name",
            "patient_insurance",
            "patient_gender",
            "patient_date_of_birth",
            "patient_phone_number",
        )
