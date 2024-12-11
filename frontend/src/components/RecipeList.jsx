import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
    const { categoryname } = useParams(); // Получаем транслит категории из URL
    const [recipes, setRecipes] = useState(null); // Изначально null
    const [categoryName, setCategoryName] = useState(''); // Храним нормальное название категории

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/recipes_by_category/?category=${categoryname}`)
            .then(response => {
                if (response.data) {
                    setRecipes(response.data.recipes || []);
                    setCategoryName(response.data.category_name || '');
                }
            })
            .catch(error => console.error('Ошибка при загрузке рецептов:', error));

    }, [categoryname]); // Повторный запрос при изменении категории

    if (!recipes) {
        return <div>Загрузка...</div>; // Показываем индикатор загрузки
    }

    return (
        <div>
            <h1>Рецепты в категории "{categoryName}"</h1>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <a href={`/recipes/${recipe.slug}`}>{recipe.title}</a>
                        </li>
                    ))}

                </ul>
            ) : (
                <p>Рецептов в этой категории пока нет.</p> // Сообщение, если рецептов нет
            )}
        </div>
    );
};

export default RecipeList;
