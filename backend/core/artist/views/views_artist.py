import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import APIException

from artist.serializers import ArtistSerializer
from account.permissions import  SuperAdminRole
from core.pagination import RawQueriesPagination
from core.views import APIViewResponseMixin
from core.common.globalResponses import BODY_NOT_BLANK_JSON
from core.common.db_connection import fetch_data_from_db, insert_query_to_db


logger = logging.getLogger('django')


__all__ = [
    'ArtistApiView',
    'ArtistUpdateApiView',
]

class ArtistApiView(APIView, APIViewResponseMixin):
    permission_classes = [SuperAdminRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = RawQueriesPagination
    
    def get(self, request, format=None):
        try:
            #  page params is not include in the endpoints then return list without pagination
            if not request.query_params.get('page'):
                query = 'SELECT id, name FROM artist ORDER BY name, id DESC'
                data = fetch_data_from_db(query, [None])
                return self.success_response(data=data, message="success")
                
            paginator = self.pagination_class()
            limit = paginator.get_limit(request)
            page_number = request.query_params.get('page')
            
            query = '''SELECT 
                         *,  ROW_NUMBER () OVER ( ORDER BY name )  
                       FROM artist 
                       ORDER BY name, id DESC 
                       LIMIT %s OFFSET %s
                    '''
            data = fetch_data_from_db(query, [limit, (int(page_number) - 1) * limit])
            
            total_page , total = paginator.page_size('SELECT COUNT(*) FROM artist')
            
            return Response({'message': 'success',
                            'total_page': total_page,
                            'total': total,
                            'current_page': page_number, 'data': data }, status=status.HTTP_200_OK)
            
        except APIException as exe:
            return self.failure_response(exe=exe)
     
     
    def post(self, request, format=None):
        try:
            if not request.body:
                    return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)
                
            serializer = ArtistSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            params = serializer.validated_data

            query = '''INSERT INTO 
                         artist (
                             name, dob, gender, 
                             address, first_release_year,  
                             no_of_albums_released, created_at
                             ) 
                         values(%s, %s, %s, %s, %s, %s, %s)'''

            insert_query_to_db(query, params)
            return self.success_response(data=None, message="success")
        
        except APIException as exe:
             return self.failure_response(exe=exe, data=serializer.errors)



class ArtistUpdateApiView(APIView, APIViewResponseMixin):
    permission_classes = [SuperAdminRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def get(self, request, pk, format=None):
        try:
            query = '''SELECT 
                        name, dob, gender, address, no_of_albums_released, first_release_year
                    FROM artist
                    WHERE id  = %s
                    '''
            data = fetch_data_from_db(query, [pk])
            return self.success_response(data=data[0], message="success")
        
        except APIException as exe:
            return self.failure_response(exe=exe)
    
    def put(self, request, pk, format=None):
        try:
            if not request.body:
                    return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)
                
            serializer = ArtistSerializer(data=request.data, context={ 'pk': pk })
            serializer.is_valid(raise_exception=True)
            params = serializer.validated_data

            query = '''UPDATE artist 
                         set 
                         name = %s, 
                         dob = %s , 
                         gender = %s , 
                         address = %s, 
                         first_release_year = %s,
                         no_of_albums_released = %s, 
                         updated_at = %s
                         where id = %s
                    '''

            insert_query_to_db(query, [*params, pk])
            return self.success_response(message="Successfully updated")
        
        except APIException as exe:
            return self.failure_response(exe=exe, data=serializer.errors)
    
    def delete(self, request, pk, format=None):
        try:
            query = 'DELETE FROM artist WHERE id = %s'
            insert_query_to_db(query, [pk])
            return self.success_response('Successfully Deleted.')
        
        except APIException as exe:
            return self.failure_response(exe=exe)
        
    
        




     
        
         