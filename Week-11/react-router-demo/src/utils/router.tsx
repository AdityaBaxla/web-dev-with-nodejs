import { createBrowserRouter, Outlet, redirect } from 'react-router'

import HomePage from '../pages/HomePage.tsx'
import ProfilePage from '../pages/ProfilePage.tsx'
import ContactPage from '../pages/ContactPage.tsx'
import Navbar from '../components/Navbar.tsx'
import ErrorPage from '../pages/ErrorPage.tsx'

const authLoader = () => {
  const isAuthenticated = true; // from localStorage or context

    if (!isAuthenticated) {
        return redirect('/');
    }
    return {userInfo: {name: 'John Doe'}};
}

const router = createBrowserRouter([

  {path: '/', element: 
  <>
  <Navbar />
  <Outlet />
  </>,
  children: [
    {index: true, element: <HomePage />},
    {path: '/contact', element: <ContactPage />},
  {path: '/profile/:userId', element: <ProfilePage />, loader: authLoader},
  ]
  },
  {path: '*', element: <ErrorPage />}
  
])

export default router