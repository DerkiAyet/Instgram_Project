import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import { createContext, useEffect, useState } from 'react';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import SideNav from './Navigation/Components/SideNav';
import IntroPage from './IntroPage';
import axios from 'axios';

export const AppContext = createContext();

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    const saveMode = localStorage.getItem('darkMode');
    return saveMode ? JSON.parse(saveMode) : false;
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])


  const [showIntro, setShowIntro] = useState(true);

  const handleIntroTimeout = () => {
    setShowIntro(false); // Hide the intro screen
  };

  const [ userAuth, setUserAuth ] = useState({
    userName: '',
    fullName: '',
    userImg: '',
    state: false
  })

  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
    .then((res) => {
      if (res.data.error) {
        setUserAuth(prevState => ({
          ...prevState,
          state: false
        }));
      } else {
        setUserAuth({
          userName: res.data.userName,
          fullName: res.data.fullName,
          userImg: res.data.userImg,
          state: true
        });
      }
    })
    .catch((err) => console.error("Error during verification:", err))
    .finally(() => setIsLoading(false));
  }, []);
  
  return (

    <AppContext.Provider value={{ darkMode, setDarkMode, userAuth, setUserAuth }}>
      {showIntro ? (
        <IntroPage onTimeout={handleIntroTimeout} />
      ) : (
        <div className={`App`} id={darkMode ? 'dark-mode' : 'light-mode'}>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<SignUp />} />
              <Route path='/' element={<NavBar />}>
                <Route index element={<HomePage />} />
              </Route>
            </Routes>
          </Router>
        </div>
      )}
    </AppContext.Provider>
  );
}

const NavBar = () => {
  return (
    <div className='main-container'>
      <SideNav />
      <Outlet />
    </div>
  )

}

export default App;
