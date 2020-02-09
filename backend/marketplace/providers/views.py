from django.contrib.postgres.search import SearchVector
from django.utils.timezone import now
from rest_framework import exceptions, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from marketplace.appointments.serializers import AppointmentsSerializer

from .models import Provider
from .serializers import ProviderSearchSerializer, ProviderSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    serializer_class = ProviderSerializer

    # Random order, limited to 30
    queryset = Provider.objects.all().order_by("?")
    filterset_fields = ("specialty", "gender")

    @action(detail=False, methods=["GET"], permission_classes=[AllowAny])
    def search(self, request):
        # Obtain the incoming "search_term" query param and validate it
        search_term = request.query_params.get("search_term")
        search_serializer = ProviderSearchSerializer(data={"search_term": search_term})

        search_serializer.is_valid(raise_exception=True)

        # Perform a PostgreSQL full-text search on the search term
        search_results = (
            Provider.objects.annotate(
                search=SearchVector("name", "specialty", "address")
            )
            .filter(search=search_serializer.validated_data["search_term"])
            .order_by("id")
            .distinct("id")
        )

        provider_serializer = ProviderSerializer(search_results, many=True)
        return Response({"results": provider_serializer.data})

    @action(detail=True, methods=["POST"], permission_classes=[AllowAny])
    def appointment(self, request, pk):
        try:
            provider = Provider.objects.get(pk=pk)
        except Provider.DoesNotExist:
            raise exceptions.NotFound()

        # Validate incoming request
        dirty_data = request.data

        # Convert incoming appointment date into separate start_time and end_time
        start_time = None
        end_time = None
        # Convert incoming patient_date_of_birth into date object
        date_of_birth = None

        appointment_serializer = AppointmentsSerializer(
            data={
                "provider": provider,
                "start_time": start_time,
                "end_time": end_time,
                "appointment_reason": dirty_data["appointment_reason"],
                "patient_name": dirty_data["patient_name"],
                "patient_insurance": dirty_data["patient_insurance"],
                "patient_gender": dirty_data["patient_gender"],
                "patient_date_of_birth": date_of_birth,
                "patient_phone_number": dirty_data["patient_phone_number"],
            }
        )

        if appointment_serializer.is_valid():
            appointment = appointment_serializer.save()
            return Response(
                {"results": {"appointment_id": appointment.id}},
                status=status.HTTP_201_CREATED,
            )

        return Response()
