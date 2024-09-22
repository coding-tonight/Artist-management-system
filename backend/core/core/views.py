import logging

from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError, APIException, NotAuthenticated


logger = logging.getLogger('django')


class APIViewResponseMixin:
    
    SUCCESS = 'success'
    FAILURE = 'fail'
    
    @classmethod
    def success_response(cls ,data=None , message=None):
       """
        Returns Success Response
        """
       response_data = {
          "status": cls.SUCCESS
        }
       
       if message is not None:
            response_data["message"] = message
       if data is not None:
            response_data["data"] = data
            
       return Response(response_data, status=status.HTTP_200_OK)

    
    @classmethod
    def failure_response(cls ,exe , data=None, message=None):
      """
        Returns Failure Response
      """
      try:
          response_data = {
              "status": cls.FAILURE,
            }
          
          if isinstance(exe, PermissionError):
            logger.error(str(exe), exc_info=True)
            return Response({**response_data, 'message': 'You do not have permission'},
                              status=status.HTTP_403_FORBIDDEN)
              
          if isinstance(exe, ValidationError):
            logger.error(str(exe), exc_info=True)
            return Response({**response_data, 'message': 'Invalid input', 'data': data},
                            status=status.HTTP_400_BAD_REQUEST)
          
          if isinstance(exe, NotAuthenticated):
            logger.error(str(exe), exc_info=True)
            return Response({**response_data, 'message': 'You are not authenticated'}, 
                            status=status.HTTP_401_UNAUTHORIZED)
          
          if isinstance(exe, APIException):
            logger.error(str(exe), exc_info=True)
            return Response({**response_data, 'message': 'Ops something went wrong'}, 
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
      except APIException as exe:
        logger.error(str(exe), exc_info=True)
        raise APIException(exe.detail)