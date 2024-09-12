import uuid
from enum import Enum

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.

def generate_uuid():
    return uuid.uuid4().hex

class CustomUserManger(models.BaseManager):
    """ Customer User Manager
    """

    def create_user(self, email, password, **extra_fields):
        # Validation
        if not email:
            raise ValueError("The Email field must be set")
        elif not password:
            raise ValueError("The Password field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


    def natural_key(self, email):
        return self.get(email=email)


class BaseModel(models.Model):
    uuid = models.UUIDField(unique=True, default=generate_uuid)
    created_at = models.DateTimeField(auto_created=False)
    created_by = models.ForeignKey('User', on_delete=models.CASCADE, db_column="created_by", related_name="+")
    updated_at = models.DateTimeField(auto_created=False)
    updated_by = models.ForeignKey('User', on_delete=models.CASCADE, db_column="updated_by", related_name="+")


# class Gender(models):
#     pass


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=12)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField()
    address = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_created=True)
    updated_at = models.DateTimeField(auto_created=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['email', 'phone']

    class Role(models.TextChoices):
        SUPER_ADMIN= "super_admin"
        ARTIST_MANAGER = "artist_manager"
        ARTIST = "artist"

    role = models.CharField(choices=Role, default=Role.ARTIST)

    objects = CustomUserManger()

    def __str__(self):
        return self.email
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    