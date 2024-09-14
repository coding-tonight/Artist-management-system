from django.db import models

from account.models import BaseModel, GenderChoices

# Create your models here.

class Artist(BaseModel):
    name = models.CharField(max_length=45, unique=True)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(choices=GenderChoices, max_length=10)
    address = models.CharField(max_length=120)
    first_release_year = models.DateField(auto_now=False)
    no_of_albums_released = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'artist'



class Song(BaseModel):
    class GenreChoices(models.TextChoices):
        RNB = 'rnb'
        COUNTRY = 'country'
        CLASSIC = 'classic'
        ROCK = 'rock'
        JAZZ = 'jazz'

    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name="artist")
    title = models.CharField(max_length=45)
    album_name = models.CharField(max_length=45)
    genre = models.CharField(choices=GenderChoices, max_length=45)
    
    class Meta:
        db_table = 'song'


