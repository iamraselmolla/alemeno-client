import logo from './logo.svg';
import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './componenets/Main';
import Home from './componenets/home/Home';
import CourseDetails from './componenets/shared/CourseDetails';

function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: 'courses/:id',
          element: <CourseDetails/>
        }
      ]
    }
  ])
  return (

    < div className="App" >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
