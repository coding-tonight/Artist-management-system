import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import  APIException

from artist.serializers import ArtistSerializer, SongSerializer
from account.permissions import  SuperAdminRole
from core.pagination import RawQueriesPagination
from core.common.globalResponses import BODY_NOT_BLANK_JSON
from core.common.db_connection import fetch_data_from_db, insert_query_to_db


logger = logging.getLogger('django')


__all__ = [
    'ArtistApiView',
    'SongApiView'
]

class ArtistApiView(APIView):
    permission_classes = [SuperAdminRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = RawQueriesPagination
    
    def get(self, request, format=None):
        
         paginator = self.pagination_class()
         limit = paginator.get_limit(request)
         offset = paginator.get_offset(request)
         
         query = 'SELECT * FROM artist ORDER BY name, id DESC  LIMIT %s OFFSET %s'
         data = fetch_data_from_db(query, [limit, offset])
         paginated_data =  paginator.paginate_queryset(data, request)
         return Response({'message': 'success',
                           'data': paginator.get_paginated_response(paginated_data).data
                          }, status=status.HTTP_200_OK)
     
     
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
            insert_query_to_db(query, [pk])
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
        
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
        
            
    
    
class SongApiView(APIView):
    permission_classes = [SuperAdminRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def get(self, request, pk, format=None):
         query = 'SELECT * FROM song where artist_id = %s'
         data = fetch_data_from_db(query, [pk])
         return Response({'message': 'success', 'data': data}, status=status.HTTP_200_OK)
     
    
    def post(self, request, format=None):
        try:
            if not request.body:
                return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = SongSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            params = serializer.validated_data
            
            query = '''INSERT INTO 
                            song (
                                title, artist_id, album_name, 
                                genre, created_at
                                ) 
                            values(%s, %s, %s, %s, %s)'''

            insert_query_to_db(query, params)
            return Response({'message': 'success'})
        
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
        
    
    def put(self, request, pk, format=None):
        try:
            if not request.body:
                    return Response(BODY_NOT_BLANK_JSON, status=status.HTTP_400_BAD_REQUEST)
                
            serializer = SongSerializer(data=request.data, context={ 'pk': pk })
            serializer.is_valid(raise_exception=True)
            params = serializer.validated_data

            query = '''UPDATE song 
                         set 
                         title = %s, 
                         artist = %s , 
                         album_name = %s , 
                         genre = %s, 
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
            query = 'DELETE FROM song WHERE id = %s'
            insert_query_to_db(query, [pk])
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
        
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe.detail)
        
    
    


     
        
        
         