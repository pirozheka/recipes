from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, RecipeViewSet, recipes_by_category

# Создаём роутер и регистрируем
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'recipes', RecipeViewSet, basename='recipe')

urlpatterns = [
    path('', include(router.urls)),
    path('recipes_by_category/', recipes_by_category, name='recipes-by-category'),
]