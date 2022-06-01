import React, {useState, useEffect} from 'react';
import { Header } from './shared/Header/Header';
import { Layout } from './shared/Layout/Layout';
import { MainBlock } from './shared/MainBlock/MainBlock';
import { Shadow } from './shared/Shadow/Shadow';
import { StatBlocks }from './shared/Statistics/StatBlocks/StatBlocks';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

export function App() {
  const data = [{
    0: {
      'Пн': {
        time: 200,
        tomato: 2,
        focus: '40%',
        pause: 150,
        stops: 3,
      },
      'Вт': {
        time: 50,
        tomato: 2,
        focus: '100%',
        pause: 0,
        stops: 0,
      },
    }
  }
]
localStorage.setItem('data', JSON.stringify(data))

  return (
    <BrowserRouter>
      <Layout>
        <Header/>
      </Layout>
      <Shadow/>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/index" />} />
          <Route path="/index" element={<MainBlock/>} />
          <Route path="/statistics" element={<StatBlocks/>} />
          <Route path="*" element={ <Navigate to="/error" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

