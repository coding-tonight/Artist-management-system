import re
from  datetime import datetime

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from rest_framework import serializers
from account.models import User, GenderChoices

from core.common.db_connection import insert_query_to_db


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request=self.context.get('request'),
                            email=email, password=password)
        if not user:
            msg = 'Unable to log in with provided credentials.'
            raise serializers.ValidationError(msg, code="authorization")

        data['user'] = user
        return data
    
    
class RegisterSerializer(serializers.Serializer):
      first_name = serializers.CharField()
      last_name = serializers.CharField()
      email = serializers.EmailField()
      phone = serializers.CharField()
      dob = serializers.DateField()
      password = serializers.CharField()
      confirm_password = serializers.CharField()
      gender = serializers.CharField()
      address = serializers.CharField()
      
      def validate_phone(self, value):
           phone_number_regex = re.compile("^(984|985|986|974|975|980|981|982|961|988|972|963)\d{7}$")
           if not phone_number_regex.match(value):
               raise serializers.ValidationError('Invalid phone number format')
           
           return value
      
      def validate(self, data):
          email = data.get('email')
          if User.objects.filter(email__iexact=email).exists():
             raise serializers.ValidationError(f'{email} already exists')
         
          password = data.get('password')
          confirm_password = data.get('confirm_password')
          if password != confirm_password:
              raise serializers.ValidationError('Password does not match with confirm password')
          password = make_password(password)
          print(password, type(password))
          
          gender_key = data.get('gender')
          if not GenderChoices.has_key(gender_key.upper()):
              raise serializers.ValidationError('Invalid gender option')
          data['gender'] = GenderChoices[gender_key].value
                    
          params = [email, password, data.get('first_name'),
            data.get('last_name'), data.get('phone'), data.get('gender'),
            data.get('dob'), 'artist', data.get('address'), False , datetime.now()]
 
          return params
      
          