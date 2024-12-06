import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const categories = ['Desserts', 'MainCourse', 'Soups'];

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category}>
                        <Link to={`/category/${category}`}>{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
