import logging

from django.views.decorators.debug import sensitive_post_parameters
from django.utils.decorators import method_decorator

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import APIException
from rest_framework import status

from account.serializers import LoginSerializer
from core.common.globalResponses import LOGIN_MESSAGE_JSON


logger = logging.getLogger('django')

__all__ = ['LoginApiView']

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
        
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.get_full_details())
        

class LogoutApiView(APIView):
    permission_classes = []
    authentication_classes = [TokenAuthentication]
    
    def post(self, request, format=None):
        request.user.auth.token.delete()
        return Response(status=status.HTTP_200_OK)
            
        
        
        
