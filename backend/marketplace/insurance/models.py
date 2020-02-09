import uuid

from django.db import models


class Insurance(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
