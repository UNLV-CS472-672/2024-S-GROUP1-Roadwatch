import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Community from './pages/Community/Community';
import Chat from './pages/Chat/Chat';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

// Collection of paths for the site.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
