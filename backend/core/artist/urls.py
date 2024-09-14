from django.urls import path

from . import  views


urlpatterns = [
    path('artist/', views.ArtistApiView.as_view(), name='artist'),
    path('artist/<str:pk>/', views.ArtistApiView.as_view(), name='update_artist'),
    path('artist/<str:pk>/', views.ArtistApiView.as_view(), name='delete_artist')
]