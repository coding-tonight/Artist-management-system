import bcrypt

from django.conf import settings

class BcryptHasherMinx:
    @staticmethod
    def encrypt(password):
        bytes = password.encode('utf-8')    
        
        salt = settings.SECRET_KEY
        pass
    
    @staticmethod
    def decrypt(password):
        pass