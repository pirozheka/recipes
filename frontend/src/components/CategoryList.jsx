import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

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
    }, []); // Пустой массив зависимостей - запрос выполняется только при монтировании компонента

    return (
        <div>
            <h1>Категории рецептов</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <Link to={`/category/${category.slug}/`}>
                            {category.category_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
