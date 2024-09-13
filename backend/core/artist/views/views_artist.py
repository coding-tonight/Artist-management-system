import logging

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import  IsAuthenticated

from account.permissions import  SuperAdminRole
from core.common.db_connection import fetch_data_from_db

class ArtistListApiView(APIView):
    permission_classes = [SuperAdminRole, IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    def get(self, request, format=None):
         query = "SELECT * FROM artist"
         data = fetch_data_from_db(query, None)
         print(data)
         pass
         
         