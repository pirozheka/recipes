import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${slug}/`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error(error));
    }, [slug]);

    if (!recipe) return <div>Загрузка...</div>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p><strong>Ингредиенты:</strong> {recipe.ingredients}</p>
            <p><strong>Как готовить:</strong> {recipe.instructions}</p>
        </div>
    );
};

export default RecipeDetail;