import logging

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated
from rest_framework.exceptions import APIException, NotFound
from rest_framework.authtoken.models import Token
from rest_framework import status

from account.permissions import  SuperAdminRole
from core.common.db_connection import insert_query_to_db, fetch_data_from_db
from account.serializers import UserSerializer
from core.views import APIViewResponseMixin
from core.common.globalResponses import BODY_NOT_BLANK_JSON
from core.pagination import RawQueriesPagination

logger = logging.getLogger('django')

__all__ = [
    'UserApiView',
    'UserEditApiView'
]

class UserApiView(generics.ListCreateAPIView, APIViewResponseMixin):
    permission_classes = [SuperAdminRole , IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = RawQueriesPagination
    
    def list(self, request, *args, **kwargs):
        try:
            paginator = self.pagination_class()
            limit = paginator.get_limit(request)
            page_number = request.query_params.get('page') or 1
            
            query = '''SELECT 
                          id, CONCAT(first_name,'  ', last_name) as name ,
                          email, phone, dob, address, role, gender  , 
                          ROW_NUMBER () OVER (
                            ORDER BY 
                             id
                          ) 
                            FROM account_user  WHERE id != %s
                        ORDER BY  id, first_name
                        LIMIT %s OFFSET %s 
                    '''
                    
            data = fetch_data_from_db(query, [request.user.pk, limit, (int(page_number) - 1) * limit])
            total_page , total = paginator.page_size('SELECT COUNT(*) FROM account_user WHERE id != {}'.format(str(request.user.pk)))
            return Response({'message': 'success',
                            'total_page': total_page,
                            'total': total,
                            'current_total': len(data),
                            'current_page': page_number, 'data': data }, status=status.HTTP_200_OK)
            
        except APIException as exe:
            return self.failure_response(exe=exe)
        
    
    def create(self, request, *args, **kwargs):
        try:
            if not request.body:
               return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)
                    
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            params = serializer.validated_data

            query = '''INSERT INTO account_user 
                        ( email, password, first_name, last_name, phone, gender, dob, role,
                        address, is_superuser, created_at) 
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                  '''

            insert_query_to_db(query, params)
            return self.success_response(data=None, message="Successfully Created.")
            
        except APIException as exe:
                return self.failure_response(exe=exe, data=serializer.errors)
            
            

class UserEditApiView(APIView, APIViewResponseMixin):
     permission_classes = [SuperAdminRole, IsAuthenticated]
     authentication_classes = [TokenAuthentication]
     
     def get(self, request, pk, format=None):
        try:
            query = '''SELECT 
                          first_name, last_name, email, dob, gender, address, phone, role
                          FROM account_user
                        WHERE id  = %s
                    '''
            data = fetch_data_from_db(query, [pk])
            
            if len(data) <= 0:
                raise NotFound('User does not exists')
            
            return self.success_response(data=data[0], message="success")
        
        except APIException as exe:
            return self.failure_response(exe=exe)
     
     def patch(self, request, pk, format=None):
        try:
            if not request.body:
               return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)
                
            serializer = UserSerializer(data=request.data, context={ 'pk': pk }, partial=True)
            serializer.is_valid(raise_exception=True)
            params = serializer.validated_data

            query = '''UPDATE account_user
                         set 
                         email = %s,
                         first_name = %s,
                         last_name = %s, 
                         phone = %s,
                         gender = %s , 
                         dob = %s , 
                         role = %s, 
                         address = %s, 
                         updated_at = %s
                         where id = %s
                    '''

            insert_query_to_db(query, [*params, pk])
            return self.success_response(message="Successfully updated.")
        
        except APIException as exe:
            return self.failure_response(exe=exe, data=serializer.errors)
    
     def delete(self, request, pk, format=None):
        try:
            # if there token token then delete token 
            token_exists = Token.objects.filter(user=pk)
            if token_exists.exists():
                token_exists.delete()
                
            query = 'DELETE FROM account_user WHERE id = %s'
            insert_query_to_db(query, [pk])
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
        
        except APIException as exe:
            return self.failure_response(exe=exe)
        
        
    
