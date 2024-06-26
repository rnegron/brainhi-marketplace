from django.contrib import admin

from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    date_hierarchy = "start_time"
    list_display = (
        "id",
        "patient_name",
        "provider",
        "start_time",
        "end_time",
        "patient_insurance",
    )
    list_filter = ("provider",)
    search_fields = ("id", "provider_id", "phone", "address")
