import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { useAppDispatch, useAppSelector } from './store/hooks';
import { initDarkMode } from './store/darkModeSlice';
import { useEffect } from 'react';
import { Bounce, ToastContainer } from "react-toastify";
import Loader from './components/custom/Loader';
import { selectIsLoading } from './store/generalSlice';
import { config } from './lib/config';

function App() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  useEffect(() => {
    dispatch(initDarkMode());
  }, [dispatch]);
  
  console.log(config.apiUrl);
  
  
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      
      {isLoading && <Loader />}
    </BrowserRouter>
  )
}

export default App
