import React, {useState, useEffect} from 'react';
import { Header } from './shared/Header/Header';
import { Layout } from './shared/Layout/Layout';
import { MainBlock } from './shared/MainBlock/MainBlock';
import { Shadow } from './shared/Shadow/Shadow';
import { StatBlocks } from './shared/Statistics/StatBlocks/StatBlocks';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './store/store';

const store = createStore(rootReducer, composeWithDevTools());

export function App() {
  let arr = [ 
    {id: 0,
    'Пн': {
      time: 40,
      tomato: 1,
      focus: 62,
      pause: 10,
      stops: 1,
    },
  }]
  localStorage.setItem('stat', JSON.stringify(arr));
 
  return (
    <Provider store={store}>
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
    </Provider>
  );
}


