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
        
    