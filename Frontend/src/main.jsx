import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import { store } from './stores/store.js';
import { RouterProvider } from 'react-router-dom';
import route from './routes/routes.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
  </Provider>
)
