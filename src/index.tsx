import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Feed from './routes/Feed/Feed'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
		<Routes>
			<Route index element={<App />} />
			<Route path="feed" element={<Feed />} />
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
