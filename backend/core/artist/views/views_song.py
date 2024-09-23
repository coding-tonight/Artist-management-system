import logging

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import APIException, NotFound

from artist.serializers import SongSerializer
from account.permissions import  SuperAdminRole, ArtistManagerRole, ArtistRole
from core.pagination import RawQueriesPagination
from core.views import APIViewResponseMixin
from core.common.globalResponses import BODY_NOT_BLANK_JSON
from core.common.db_connection import fetch_data_from_db, insert_query_to_db

logger = logging.getLogger('django')


class SongApiView(APIView, APIViewResponseMixin):
    permission_classes = [SuperAdminRole | ArtistRole | ArtistManagerRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = RawQueriesPagination
    
    def get(self, request, format=None):
        try:
            paginator = self.pagination_class()
            limit = paginator.get_limit(request)
            page_number = request.query_params.get('page') or 1    
            
            query = '''SELECT 
                        song.id, song.genre, song.title, song.album_name , artist.name as artist ,
                        ROW_NUMBER () OVER ( ORDER BY song.id, song.title )  
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
            
        except APIException as exe:
              return self.failure_response(exe=exe)
     
    
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
            return self.success_response(message="Successfully song added")
        
        except APIException as exe:
            return self.failure_response(exe=exe, data=serializer.errors)
    
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
            return self.failure_response(exe=exe, data=serializer.errors)
        
     
    def delete(self, request, pk, format=None):
        try:
            query = 'DELETE FROM song WHERE id = %s'
            insert_query_to_db(query, [pk])
            return Response({'message': 'success'}, status=status.HTTP_200_OK)
        
        except APIException as exe:
            return self.failure_response(exe=exe)
                       
class ArtistSongApiView(generics.ListAPIView, APIViewResponseMixin):
    permission_classes = [SuperAdminRole | ArtistRole | ArtistManagerRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = RawQueriesPagination
    
    def list(self, request, pk, *args, **kwargs):
        try:
            paginator = self.pagination_class()
            limit = paginator.get_limit(request)
            page_number = request.query_params.get('page') or 1
            
            query = '''SELECT 
                         id, title, album_name, genre, ROW_NUMBER () OVER ( ORDER BY song.title )  
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
            return self.failure_response(exe=exe)
        

         

class ArtistSongEditApiView(APIView, APIViewResponseMixin):
     permission_classes = [SuperAdminRole, IsAuthenticated]
     authentication_classes = [TokenAuthentication]
    
     def get(self, request, pk, format=None):
        try:
            query = '''SELECT 
                        title, artist_id as artist, album_name, genre
                    FROM song
                    WHERE id  = %s
                    '''
            data = fetch_data_from_db(query, [pk])
            
            if len(data) < 0:
                raise NotFound('Song does not exists')
            
            return self.success_response(data=data[0], message="success")
        
        except APIException as exe:
            return self.failure_response(exe=exe)
    
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
                         artist_id = %s , 
                         album_name = %s , 
                         genre = %s, 
                         updated_at = %s
                         where id = %s
                    '''

            insert_query_to_db(query, [*params, pk])
            return self.success_response(message="Successfully Updated")
        
        except APIException as exe:
             return self.failure_response(exe=exe, data=serializer.errors)
    
     def delete(self, request, pk, format=None):
        try:
            query = 'DELETE FROM song WHERE id = %s'
            insert_query_to_db(query, [pk])
            return self.success_response(message="Successfully Deleted")
        
        except APIException as exe:
            return self.failure_response(exe=exe)
         