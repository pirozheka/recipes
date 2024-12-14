import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/categorylist.css';

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
            <div className="container">
                <h1>Категории рецептов</h1>
                <ul className='categories'>
                    {categories.map(category => (
                        <li key={category.id}>
                            <Link className='categories__item' to={`/category/${category.slug}/`}>
                                <div className="img__container">
                                    <img src={category.category_img} alt="" />
                                </div>
                                <div className="categories__item-caption">
                                    {category.category_name}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryList;
