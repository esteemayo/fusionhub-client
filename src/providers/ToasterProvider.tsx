import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToasterProvider = () => {
  return (
    <ToastContainer autoClose={3000} theme='dark' position='bottom-right' />
  );
};

export default ToasterProvider;
