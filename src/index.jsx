import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/index.jsx'
import {RouterProvider} from 'react-router-dom'
import {ConfigProvider} from 'antd'
import router from './router'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      token: {
        borderRadius: 0,
        colorPrimary: '#0E5890'
      },
      // cssVar: true,
    }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
