import {RouterProvider} from "react-router-dom";
import router from "../router/router.jsx";
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import store from '../store'
import React from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>,
)
