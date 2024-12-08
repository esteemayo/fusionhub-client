import { RouterProvider } from 'react-router-dom';

import { router } from './utils/router';

import './global.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
