from rest_framework import viewsets

from .models import Insurance
from .serializers import InsuranceSerializer


class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer
