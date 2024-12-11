from django.contrib import admin
from .models import Category, Recipe, RecipeCategory

# Inline для отображения промежуточной модели
class RecipeCategoryInline(admin.TabularInline):
    model = RecipeCategory
    extra = 1  # Количество дополнительных пустых строк для ввода

# Регистрация модели Recipe с Inline
@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'get_categories']
    list_filter = ['created_at']
    search_fields = ['title', 'ingredients']
    inlines = [RecipeCategoryInline]  # Добавляем inline для связей

    # Метод для отображения связанных категорий
    def get_categories(self, obj):
        return ", ".join([category.category_name for category in obj.category_names.all()])
    get_categories.short_description = 'Категории'

# Регистрация модели Category
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['category_name']
    search_fields = ['category_name']
