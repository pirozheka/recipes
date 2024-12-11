import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './components/CategoryList.jsx';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetail from './components/RecipeDetail.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/category/:categoryname" element={<RecipeList />} />
          <Route path="/recipes/:slug" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;