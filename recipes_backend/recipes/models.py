from django.db import models
from django.utils.text import slugify
from unidecode import unidecode

class Category(models.Model):
    category_name = models.CharField(max_length=65, unique=True)
    category_img = models.FileField(upload_to='uploads/', verbose_name='Изображение', blank=True)
    slug = models.SlugField(max_length=70, unique=True, blank=True)

    def save(self, *args, **kwargs):
        # Автоматически создаем slug на основе имени категории
        if not self.slug:
            # Если не заполнено - делаем автотранслит с помощью библиотеки unidecode
            self.slug = slugify(unidecode(self.category_name))
        super().save(*args, **kwargs)

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
    category_names = models.ManyToManyField(Category, through='RecipeCategory')
    slug = models.SlugField(max_length=260, unique=True, blank=True)
    recipe_img = models.FileField(upload_to='uploads/', verbose_name='Изображение', blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.title))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Рецепт'
        verbose_name_plural = 'Рецепты'


#Модель для связи "Многие к многим"
class RecipeCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'