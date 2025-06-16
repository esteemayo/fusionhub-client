import { RouterProvider } from 'react-router-dom';

import { router } from './utils/router';
import { useTokenExpiration } from './hooks/useTokenExpiration';

function App() {
  useTokenExpiration();

  return <RouterProvider router={router} />;
}

export default App;
