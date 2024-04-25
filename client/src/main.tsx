import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Chat,
  Community,
  Home,
  Login,
  Profile,
  Instructions,
  Register,
  ResetPassword,
  SettingsPage,
  CommunityX,
  Forgot,
} from '@/pages';
import { PrivateRoute } from '@/utils';
import './index.css';
import PostDiscussion from './components/PostDiscussion/PostDiscussion';

// Collection of paths for the site.
const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute component={<Home />} />,
  },
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/communityX',
    element: <CommunityX />,
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
    path: '/home', // for testing only
    element: <Home />,
  },
  {
    path: '/instructions',
    element: <Instructions />,
  },
  {
    path: '/register/',
    element: <Register />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/forgot-password',
    element: <Forgot />,
  },
  {
    path: '/post/:id',
    element: <PostDiscussion id="id" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
