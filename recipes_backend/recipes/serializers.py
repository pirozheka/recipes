from rest_framework import serializers
from .models import Category, Recipe

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['id', 'category_name']

class RecipeSerializer(serializers.ModelSerializer):
    category_names = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'ingredients', 'instructions', 'created_at', 'category_names']



