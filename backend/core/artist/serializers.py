from datetime import datetime

from rest_framework import serializers
from rest_framework.exceptions import  NotFound

from .models import Artist, Song

class ArtistSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField()
    dob =  serializers.DateField()
    gender = serializers.CharField()
    address = serializers.CharField()
    first_release_year = serializers.DateField()
    no_of_albums_released = serializers.IntegerField()
    
    
    def validate(self, data):
        name = data.get('name')
        
        pk = self.context.get('pk')
        if pk:
            if not Artist.objects.filter(id=pk).exists():
                raise NotFound('Artist does not exists')
            
            if Artist.objects.filter(name__iexact=name).exclude(id=pk).exists():
                print('hello')
                raise serializers.ValidationError(f'{name} name is already taken.')
        else:
            if Artist.objects.filter(name__iexact=name).exists():
                raise serializers.ValidationError(f'{name} name is already taken.')
        
        params = [name, data.get('dob'), data.get('gender'), 
                  data.get('address'), data.get('first_release_year'),
                  data.get('no_of_albums_released'), datetime.now()]
        
        return params
    

class SongSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    artist = serializers.PrimaryKeyRelatedField()
    title = serializers.CharField()
    album_name = serializers.CharField()
    genre =serializers.CharField()
    
    def validate(self, data):
        title = data.get('title')
        album_name = data.get('album_name')
        
        pk = self.context.get('pk')
        if pk:
            if not Song.objects.filter(id=pk).exists():
                raise NotFound('Artist does not exists')
            
            if Song.objects.filter(name__iexact=title).exclude(id=pk).exists():
                raise serializers.ValidationError(f'{title} title is already taken.')
            
            if Song.objects.filter(album_name__iexact=album_name).exclude(id=pk).exists():
                raise serializers.ValidationError(f"{album_name} album name is already taken")
        else:
            if Song.objects.filter(name__iexact=title).exists():
                raise serializers.ValidationError(f'{album_name} album name is already taken.')
            
        
        artist = data.get('artist')
        if not Artist.objects.filter(id=artist).exists():
            raise serializers.ValidationError('Artist is not available or does not exists')
        
        genre  = data.get('genre')
        params = [title, artist, album_name, genre, datetime.now()]
        
        return params
        
    
        
    