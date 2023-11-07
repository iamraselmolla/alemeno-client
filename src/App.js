
import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './componenets/Main';
import Home from './componenets/page/home/Home';
import CourseDetails from './componenets/shared/CourseDetails';
import { Toaster } from 'react-hot-toast';
import Login from './componenets/page/login/Login';
import Register from './componenets/page/register/Register';
import Dashboard from './componenets/page/dashboard/Dashboard';
import PrivateRoute from './componenets/router/PrivateRoute';
import PaymentItem from './componenets/stripe/Payment';

function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'courses/:id',
          element: <CourseDetails />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/dashboard',
          element: <PrivateRoute><Dashboard /></PrivateRoute>
        },
      ]
    }
  ])
  return (

    < div className="App" >
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
