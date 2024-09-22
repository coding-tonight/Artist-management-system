from django.urls import path

from . import  views

urlpatterns = [
    path('artist/', views.ArtistApiView.as_view(), name='artist'),
    path('artist/<str:pk>/', views.ArtistUpdateApiView.as_view(), name='update_artist'),

    path('artist/record/<str:pk>/', views.ArtistSongApiView.as_view(), name='get_artist_song'),
    
    path('song/', views.SongApiView.as_view(), name='artist'),
]