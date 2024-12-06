import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
    const { categoryname } = useParams(); // Получаем название категории из URL
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/recipes/?category=${categoryname}`)
            .then(response => setRecipes(response.data))
            .catch(error => console.error(error));
    }, [categoryname]); // Повторный запрос при изменении категории

    return (
        <div>
            <h1>Recipes in {categoryname}</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <a href={`/recipes/${recipe.id}-${recipe.title}`}>{recipe.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
