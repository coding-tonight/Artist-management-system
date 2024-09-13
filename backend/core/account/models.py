# import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

# def generate_uuid():
#     return uuid.uuid4().hex

class BaseModel(models.Model):
    # uuid = models.UUIDField(unique=True, default=generate_uuid)
    created_at = models.DateTimeField(auto_created=False)
    updated_at = models.DateTimeField(auto_created=False)

    class Meta:
        abstract = True

class CustomUserManger(BaseUserManager):
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
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.Role.SUPER_ADMIN)

        if extra_fields.get('role') != User.Role.SUPER_ADMIN:
            raise ValueError('Superuser must have role super admin.')
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


    def natural_key(self, email):
        return self.get(email=email)

class GenderChoices(models.TextChoices):
    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=12)
    dob = models.DateField(null=True, blank=True, auto_now=False)
    gender = models.CharField(choices=GenderChoices, max_length=10)
    address = models.CharField(max_length=120, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_created=False, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['phone']

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

    