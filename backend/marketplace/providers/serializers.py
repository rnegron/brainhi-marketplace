from rest_framework import serializers

from .models import Provider


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = [
            "id",
            "provider_id",
            "name",
            "picture",
            "specialty",
            "phone_number",
            "address",
            "gender",
            "bio",
        ]
        read_only_fields = ["provider_id"]


class ProviderSearchSerializer(serializers.Serializer):
    search_term = serializers.CharField(max_length=24)
