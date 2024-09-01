import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import { createContext, useEffect, useState } from 'react';
import Login from './Authentication/Components/Login';
import SignUp from './Authentication/Components/SignUp';
import SideNav from './Navigation/Components/SideNav';
import IntroPage from './IntroPage';
import axios from 'axios';
import Profile from './Profile/Componenets/Profile';
import AccountPage from './Profile/Componenets/AccountPage';
import ForgotPassword from './Authentication/Components/ForgotPassword';
import ResetPassword from './Authentication/Components/ResetPassword';
import EditProfile from './Profile/Componenets/EditProfile';

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

  //------------Getting the Posts-------------

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3001/posts')
      .then((res) => {
        setListOfPosts(res.data)
      })
      .catch((err) => console.error(err))

  }, [])
  
  const [listOfFollowees, setListOfFollowees] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3001/auth/get_infos', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
      .then((res) => {
        setListOfFollowees(res.data.listOfFolloweesIds || []); 
      })
      .catch((err) => console.error(err.response.data))

  }, [userAuth.state])

  return (

    <AppContext.Provider value={{ darkMode, setDarkMode, userAuth, setUserAuth, isLoading, listOfPosts, setListOfPosts, listOfFollowees, setListOfFollowees }}>
      {showIntro ? (
        <IntroPage onTimeout={handleIntroTimeout} />
      ) : (
        <div className={`App`} id={darkMode ? 'dark-mode' : 'light-mode'}>
          <Router>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<SignUp />} />
              <Route path='/forgot-password' element= {<ForgotPassword />} />
              <Route path='/reset-password/:token' element= {<ResetPassword />} />

              <Route path='/' element={<NavBar />}>
                <Route index element={<HomePage />} />
                <Route path='profile' element = {<Profile />} />
                <Route path=':userName' element = { <AccountPage /> } />
                <Route path='accounts/edit' element = { <EditProfile /> } />
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
