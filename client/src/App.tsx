import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { NotFound } from './components';
import { Home, MovieDetail } from './pages';

import { GlobalStyle } from './style/globalStyle';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:movieId' element={<MovieDetail />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
