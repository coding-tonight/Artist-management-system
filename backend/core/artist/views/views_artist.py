import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import  APIException

from artist.serializers import ArtistSerializer
from account.permissions import  SuperAdminRole
from core.common.globalResponses import BODY_NOT_BLANK_JSON
from core.common.db_connection import fetch_data_from_db, insert_query_to_db


logger = logging.getLogger('django')


__all__ = [
    'ArtistApiView'
]

class ArtistApiView(APIView):
    permission_classes = [SuperAdminRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def get(self, request, format=None):
         query = 'SELECT * FROM artist'
         data = fetch_data_from_db(query, None)
         return Response({'message': 'success', 'data': data}, status=status.HTTP_200_OK)
     
     
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
            return Response({'message': 'success'})
        
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
        
    
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
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
        
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
        
     
    def delete(self, request, pk, format=None):
        try:
            query = 'DELETE FROM artist WHERE id = %s'
            params = [pk]
            insert_query_to_db(query, params)
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
        
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
        
            
    
    
class SongApiView(APIView):
    permission_classes = []
    authentication_classes = []
    
    def get(self, request, pk, format=None):
         query = 'SELECT * FROM song where artist_id = %s'
         data = fetch_data_from_db(query, None)
         return Response({'message': 'success', 'data': data}, status=status.HTTP_200_OK)
    
    # def post(self, request, format=None):
    #     try:
    #         if not request.body:
    #                 return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)
                
    #         serializer = ArtistSerializer(data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         params = serializer.validated_data

    #         query = '''INSERT INTO 
    #                      song (
    #                          name, dob, gender, 
    #                          address, first_release_year,  
    #                          no_of_albums_released, created_at
    #                          ) 
    #                      values(%s, %s, %s, %s, %s, %s, %s)'''

    #         insert_query_to_db(query, params)
    #         return Response({'message': 'success'})
        
    #     except APIException as exe:
    #         logger.error(str(exe), exc_info=True)
    #         raise APIException(exe.detail)
    
    


     
        
        
         