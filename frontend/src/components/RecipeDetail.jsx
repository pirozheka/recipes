import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/recipedetail.css';


const RecipeDetail = () => {
    const { slug } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recipes/${slug}/`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error(error));
    }, [slug]);

    useEffect(() => {
        // Получение категорий с сервера
        axios
            .get('http://127.0.0.1:8000/api/categories/')
            .then(response => {
                setCategories(response.data); // Устанавливаем категории в состояние
            })
            .catch(error => {
                console.error('Ошибка при загрузке категорий:', error);
            });
    }, []);

    if (!recipe) return <div>Загрузка...</div>;

    return (
        <div>
            <div className="container">
                <h1>{recipe.title}</h1>
                <div className="recipe__img">
                    <img src={recipe.recipe_img} alt="" />
                </div>
                <div className="recipe__description">
                    <p><strong>Ингредиенты:</strong> {recipe.ingredients}</p>
                    <p><strong>Как готовить:</strong> {recipe.instructions}</p>
                </div>
                <div className='recipes__other'>
                <div><strong>Другие рецепты в категориях:</strong></div>
                <ul className='recipes__other-list'>
                    {categories.map(category => (
                        <li key={category.id}>
                            <Link to={`/category/${category.slug}/`}>
                                {category.category_name}
                            </Link> |
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default RecipeDetail;