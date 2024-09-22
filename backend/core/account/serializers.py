import re
from  datetime import datetime

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from rest_framework import serializers
from account.models import User, GenderChoices


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
          
          gender_key = data.get('gender')
          if not GenderChoices.has_key(gender_key):
              raise serializers.ValidationError('Invalid gender option')
          gender = gender_key
                  
          params = [email, password, data.get('first_name'),
            data.get('last_name'), data.get('phone'), gender,
            data.get('dob'), 'artist', data.get('address'), False , datetime.now()]
 
          return params
      
      


class UserSerializer(RegisterSerializer):
     role = serializers.CharField()
     
     def validate(self, data):
         
          pk = self.context.get('pk')
          if pk:
               email = data.get('email')
               if User.objects.filter(email__iexact=email).exclude(id=pk).exists():
                  raise serializers.ValidationError(f'{email} already exists')
          else:     
                email = data.get('email')
                if User.objects.filter(email__iexact=email).exists():
                    raise serializers.ValidationError(f'{email} already exists')
                
                password = data.get('password')
                confirm_password = data.get('confirm_password')
                if password != confirm_password:
                    raise serializers.ValidationError('Password does not match with confirm password')
                password = make_password(password)
                
            
          gender_key = data.get('gender')
          if not GenderChoices.has_key(gender_key):
              raise serializers.ValidationError('Invalid gender option')
          gender = gender_key
          
          role = data.get('role')
          if not User.Role.has_key(role):
              raise serializers.ValidationError('Invalid role option')
          
          
          if pk:
              params = [email, data.get('first_name'),
                data.get('last_name'), data.get('phone'), gender,
                data.get('dob'), role, data.get('address'), False , datetime.now()]
          else:
            params = [email, password, data.get('first_name'),
                data.get('last_name'), data.get('phone'), gender,
                data.get('dob'), role, data.get('address') , datetime.now()]
 
          return params
      
          