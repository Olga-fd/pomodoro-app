import React from 'react';
import { Header } from './shared/Header/Header';
import { Layout } from './shared/Layout/Layout';
import { MainBlock } from './shared/MainBlock/MainBlock';
import { Shadow } from './shared/Shadow/Shadow';
import { StatBlocks } from './shared/Statistics/StatBlocks/StatBlocks';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, persistedState } from './store/store';

const store = createStore(rootReducer, persistedState, composeWithDevTools());

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Header/>
        </Layout>
        <Shadow/>
        <Layout>
          <Routes>
            <Route path="/" element={<MainBlock/>} />
            <Route path="/statistics" element={<StatBlocks/>} />
            <Route path="/dist/*" element={ <Navigate to="/" />} />
            {/* <Route path="/*" element={ <Navigate to="/error" />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}





