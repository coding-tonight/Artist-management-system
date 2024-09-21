import logging

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import  APIException

from artist.serializers import ArtistSerializer, SongSerializer
from account.permissions import  SuperAdminRole, ArtistManagerRole, ArtistRole
from core.pagination import RawQueriesPagination
from core.common.globalResponses import BODY_NOT_BLANK_JSON
from core.common.db_connection import fetch_data_from_db, insert_query_to_db


logger = logging.getLogger('django')


__all__ = [
    'ArtistApiView',
    'SongApiView',
    'ArtistSongApiView'
]

class ArtistApiView(APIView):
    permission_classes = [SuperAdminRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = RawQueriesPagination
    
    def get(self, request, format=None):
        
         paginator = self.pagination_class()
         limit = paginator.get_limit(request)
         page_number = request.query_params.get('page') or 1
         
         query = 'SELECT * FROM artist ORDER BY name, id DESC  LIMIT %s OFFSET %s'
         data = fetch_data_from_db(query, [limit, (int(page_number) - 1) * limit])
         
         total_page , total = paginator.page_size('SELECT COUNT(*) FROM artist')
         
         return Response({'message': 'success',
                          'total_page': total_page,
                          'total': total,
                          'current_page': page_number, 'data': data }, status=status.HTTP_200_OK)
     
     
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
    pagination_class = RawQueriesPagination
    
    def get(self, request, format=None):
         paginator = self.pagination_class()
         limit = paginator.get_limit(request)
         page_number = request.query_params.get('page') or 1
         
         query = '''SELECT 
                      song.id, song.genre, song.title, song.album_name , artist.name as artist_name 
                    FROM song 
                      inner join artist on song.artist_id = artist.id 
                    ORDER BY song.id, song.title 
                    LIMIT %s OFFSET %s 
                 '''
                    
         data = fetch_data_from_db(query, [limit, (int(page_number) - 1) * limit])
         total_page , total = paginator.page_size('SELECT COUNT(*) FROM song')
         return Response({'message': 'success',
                          'total_page': total_page,
                          'total': total,
                          'current_page': page_number, 'data': data }, status=status.HTTP_200_OK)
     
    
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
        


class ArtistSongApiView(generics.ListAPIView):
    permission_classes = [SuperAdminRole, ArtistRole, ArtistManagerRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = RawQueriesPagination
    
    def list(self, request, pk, *args, **kwargs):
        try:
            paginator = self.pagination_class()
            limit = paginator.get_limit(request)
            page_number = request.query_params.get('page') or 1
            
            query = '''SELECT 
                         id, title, album_name, genre
                        FROM song  WHERE artist_id = %s
                        ORDER BY  id, title 
                        LIMIT %s OFFSET %s 
                    '''
                    
            data = fetch_data_from_db(query, [pk, limit, (int(page_number) - 1) * limit])
            total_page , total = paginator.page_size('SELECT COUNT(*) FROM song WHERE artist_id = {}'.format(str(pk)))
            return Response({'message': 'success',
                            'total_page': total_page,
                            'total': total,
                            'current_page': page_number, 'data': data }, status=status.HTTP_200_OK)
            
        except APIException as exe:
            logger.error(str(exe), exc_info=True)
            raise APIException(exe)
            
         
        
          
                 
        
         


     
        
        
         