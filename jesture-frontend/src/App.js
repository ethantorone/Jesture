import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RoomSim from './components/RoomSim';
import ActionSelect from './components/ActionSelect';
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
      
    </div>
  );
}

export default App;
