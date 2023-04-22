from django.db import models
from django.contrib.auth.models import  AbstractUser
# Create your models here.


class User(AbstractUser):

    USER_TYPES = (
        ('agriculteur','agriculteur'),
        ('expert','expert')
    )
    type = models.CharField(choices=USER_TYPES)
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'