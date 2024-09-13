from django.contrib.auth import  authenticate

from rest_framework import serializers


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