import uuid

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

from marketplace.insurance.models import Insurance


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    PROVIDER = "PROVIDER"
    PATIENT = "PATIENT"

    ROLE_CHOICES = [(PATIENT, "patient"), (PROVIDER, "provider")]

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

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(blank=True, max_length=255)
    email = models.EmailField(verbose_name=_("email address"), unique=True)

    is_staff = models.BooleanField(
        verbose_name=_("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        verbose_name=_("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )

    date_joined = models.DateTimeField(
        verbose_name=_("date joined"), default=timezone.now
    )

    date_of_birth = models.DateField(null=True)

    phone_number = PhoneNumberField()

    address = models.CharField(max_length=128, blank=True)

    gender = models.CharField(max_length=30, choices=GENDER_CHOICES)

    provider_id = models.CharField(max_length=10, blank=True)

    insurance = models.ForeignKey(Insurance, null=True, on_delete=models.SET_NULL)

    role = models.CharField(max_length=8, choices=ROLE_CHOICES)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
