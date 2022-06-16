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
    // 'Вт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Ср': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Чт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Пт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Сб': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Вс': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Вт': {
    //   time: 50,
    //   tomato: 2,
    //   focus: 100,
    //   pause: 10,
    //   stops: 2,
    // },
    // 'Ср': {
    //   time: 30,
    //   tomato: 1,
    //   focus: 83,
    //   pause: 5,
    //   stops: 0,
    // },
    // 'Чт': {
    //   time: 60,
    //   tomato: 2,
    //   focus: 83,
    //   pause: 10,
    //   stops: 1,
    // },
    // 'Пт': {
    //   time: 50,
    //   tomato: 2,
    //   focus: 100,
    //   pause: 10,
    //   stops: 0,
    // },
    // 'Сб': {
    //   time: 100,
    //   tomato: 3,
    //   focus: 75,
    //   pause: 25,
    //   stops: 3,
    // },
    // 'Вс': {
    //   time: 25,
    //   tomato: 1,
    //   focus: 100,
    //   pause: 0,
    //   stops: 0,
    //   },
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


