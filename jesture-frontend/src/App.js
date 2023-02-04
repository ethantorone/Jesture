import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RoomSim from './components/RoomSim';
import CameraPage from './components/cameraPage';
import './App.css';
import { Action } from '@remix-run/router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoomSim></RoomSim>
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
