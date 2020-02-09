from rest_framework import viewsets

from .models import Appointment
from .serializers import AppointmentsSerializer


class AppointmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentsSerializer
