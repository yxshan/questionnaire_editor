import { RouterProvider } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';

import './App.css';
import routerConfig from './router';

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
