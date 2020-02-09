from django.contrib.postgres.search import SearchVector
from django.utils.timezone import now
from rest_framework import exceptions, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Provider
from .serializers import ProviderSearchSerializer, ProviderSerializer


class ProviderViewSet(viewsets.ModelViewSet):
    serializer_class = ProviderSerializer
    queryset = Provider.objects.all()
    filterset_fields = ("specialty", "gender")

    @action(detail=False, methods=["GET"], permission_classes=[AllowAny])
    def search(self, request):
        search_term = request.query_params.get("search_term")
        search_serializer = ProviderSearchSerializer(data={"search_term": search_term})

        if search_serializer.is_valid():
            search_results = (
                Provider.objects.annotate(
                    search=SearchVector("name", "specialty", "address")
                )
                .filter(search=search_serializer.validated_data["search_term"])
                .order_by("id")
                .distinct("id")
            )

            provider_serializer = ProviderSerializer(search_results, many=True)
            return Response({"results": item_serializer.data})
        else:
            return Response(
                search_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=["POST"])
    def appointment(self, request):
        # Validate incoming request
        pass
