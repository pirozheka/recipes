from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, Recipe
from .serializers import CategorySerializer, RecipeSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# поиск рецептов по slug
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    lookup_field = 'slug'

    def get_object(self):
        slug = self.kwargs['slug']
        return Recipe.objects.get(slug=slug)

# фильтрация рецептов по категории
@api_view(['GET'])
def recipes_by_category(request):
    category_slug = request.GET.get('category')  # Получаем slug из URL
    try:
        # Ищем категорию по slug
        category = Category.objects.get(slug=category_slug)
        # Находим рецепты, относящиеся к этой категории
        recipes = Recipe.objects.filter(category_names=category)
        serializer = RecipeSerializer(recipes, many=True)
        return Response({
            "category_name": category.category_name,  # Отправляем нормальное имя категории
            "recipes": serializer.data  # Список рецептов
        })
    except Category.DoesNotExist:
        return Response({"error": "Категория не найдена"}, status=404)
