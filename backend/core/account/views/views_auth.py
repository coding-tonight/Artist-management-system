import logging
from datetime import datetime

from django.views.decorators.debug import sensitive_post_parameters
from django.utils.decorators import method_decorator

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import APIException, ValidationError
from rest_framework import status

from account.serializers import LoginSerializer, RegisterSerializer
from core.common.globalResponses import LOGIN_MESSAGE_JSON, BODY_NOT_BLANK_JSON


logger = logging.getLogger('django')

__all__ = ['LoginApiView', 'RegisterApiView']

@method_decorator(sensitive_post_parameters('password'), name="dispatch")
class LoginApiView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, format=None):
        try:
            serializer = LoginSerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data.get('user')
            
            token, created = Token.objects.get_or_create(user=user)

            response = {
                **LOGIN_MESSAGE_JSON,
                'data': {
                    'token': token.key
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        
        except ValidationError as exe:
            logger.error(str(exe), exc_info=True)
            return Response({'message': 'Invalid', 'errors': exe.detail }, status=status.HTTP_400_BAD_REQUEST)
            
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
        

class LogoutApiView(APIView):
    permission_classes = []
    authentication_classes = [TokenAuthentication]
    
    def post(self, request, format=None):
        request.user.auth.token.delete()
        return Response(status=status.HTTP_200_OK)
    
    

class RegisterApiView(APIView):
    permission_classes = []
    authentication_classes = []
    
    def post(self, request, format=None):
        try:
            if not request.body:
                return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)

            serializer = RegisterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(created_at=datetime.now())
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
    
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
            
        
        

