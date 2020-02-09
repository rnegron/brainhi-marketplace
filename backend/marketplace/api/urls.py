from django.urls import include, path

urlpatterns = [
    path("appointments/", include("marketplace.appointments.urls")),
    path("insurance/", include("marketplace.insurance.urls")),
]
