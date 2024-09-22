from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.LoginApiView.as_view(), name="login"),
    path('register/', views.RegisterApiView.as_view(), name="register"),
    
    path('user/', views.UserApiView.as_view(), name="user"),
    path('user/<str:pk>/', views.UserEditApiView.as_view(), name="user-detail"),
]
