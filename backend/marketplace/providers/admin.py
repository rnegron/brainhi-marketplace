from django.contrib import admin

from .models import Provider


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ("provider_id", "name", "specialty", "gender", "phone_number")
    list_filter = ("specialty", "gender")
    search_fields = ("provider_id", "phone", "address")
