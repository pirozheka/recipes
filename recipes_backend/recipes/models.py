from django.db import models

# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=65, unique=True)
    
    def __str__(self):
        return self.category_name
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    ingredients = models.TextField()
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    category_names = models.ManyToManyField(Category, through = 'RecipeCategory')

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Рецепт'
        verbose_name_plural = 'Рецепты'
    

#Модель для связи "Многие к многим"
class RecipeCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)