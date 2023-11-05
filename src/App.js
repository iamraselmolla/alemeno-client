import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './componenets/Main';
import Home from './componenets/home/Home';

function App() {
  useEffect(() => {
    fetch('courses.json')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
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
