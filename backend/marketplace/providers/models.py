import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class Provider(models.Model):
    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"
    PREFER_NOT_TO_SAY = "PREFER NOT TO SAY"

    GENDER_CHOICES = [
        (MALE, "male"),
        (FEMALE, "female"),
        (OTHER, "other"),
        (PREFER_NOT_TO_SAY, "prefer not to say"),
    ]

    SPECIALTIES = [
        "Allergist",
        "Anesthesiologist",
        "Dermatologist",
        "Radiologist",
        "Family Doctor",
        "Internal Medicine",
        "Neurologist",
        "Gynecologist",
        "Ophthalmologist",
        "Pathologist",
        "Pediatrician",
        "Psychiatrist",
        "Psychologist",
        "Cardiologist",
    ]

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)

    provider_id = models.CharField(max_length=10, blank=True)
    name = models.CharField(blank=True, max_length=255)
    specialty = models.CharField(max_length=64)

    picture = models.ImageField(
        upload_to="provider_avatar", default="default-avatar.png"
    )

    phone_number = models.CharField(max_length=16)
    address = models.CharField(max_length=128, blank=True)
    gender = models.CharField(max_length=30, choices=GENDER_CHOICES)
    bio = models.TextField(max_length=1028)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("provider")
        verbose_name_plural = _("providers")
