import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import { store } from './stores/store.js';
import { RouterProvider } from 'react-router-dom';
import route from './routes/routes.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
  <StrictMode>
    <RouterProvider router={route}/>
          <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

  </StrictMode>
  </Provider>
)
