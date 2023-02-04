import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import GestureCreate from './Components/gestureCreate';
import RoomSim from './Components/RoomSim';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoomSim></RoomSim>
  },
  {
    path: 'create-gesture',
    element: <GestureCreate></GestureCreate>
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
