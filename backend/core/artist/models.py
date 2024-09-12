from django.db import models

from account.models import BaseModel

# Create your models here.

class Artist(BaseModel):
    name = models.CharField(max_length=45)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField()
    address = models.CharField(max_length=120)
    first_release_year = models.DateField(auto_now=False)
    no_of_albums_released = models.PositiveIntegerField(default=0, max_length=5)

    class Meta:
        db_table = 'artist'



class Song(BaseModel):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name="artist")
    title = models.CharField(max_length=45)
    album_name = models.CharField(max_length=45)
    genre = models.CharField()
    
    class Meta:
        db_table = 'song'


