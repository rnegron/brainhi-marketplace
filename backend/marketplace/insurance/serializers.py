from rest_framework import serializers

from . import models


class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Insurance
        fields = ("id",)
