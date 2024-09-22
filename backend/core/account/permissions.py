from rest_framework import permissions

from account.models import User


class SuperAdminRole(permissions.BasePermission):
    """ Custom Permission for SuperAdmin Role
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.role == User.Role.SUPER_ADMIN.value:
            return True
        
    def has_object_permission(self, request, view, obj):
        if request.user.role == User.Role.SUPER_ADMIN.value:
            return True
        
        return False
    

class ArtistManagerRole(permissions.BasePermission):
    """ Custom Permission for ArtistManger Role
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.role == User.Role.ARTIST_MANAGER.value:
            return True
        
    def has_object_permission(self, request, view, obj):
        if request.user.role == User.Role.ARTIST_MANAGER.value:
            return True
        
        return False
    


class ArtistRole(permissions.BasePermission):
    """ Custom Permission for Artist Role
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.role == User.Role.ARTIST.value:
            return True
        
    def has_object_permission(self, request, view, obj):
        if request.user.role == User.Role.ARTIST.value:
            return True
        
        return False
    
