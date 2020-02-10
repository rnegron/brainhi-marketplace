from django.urls import include, path

urlpatterns = [
    path("providers/", include("marketplace.providers.urls")),
    path("appointments/", include("marketplace.appointments.urls")),
]
