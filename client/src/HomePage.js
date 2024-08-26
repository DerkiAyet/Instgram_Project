import React, { useContext, useEffect } from 'react'
import './App.css'
import TimeLine from './Timeline/Components/TimeLine'
import { AppContext } from './App'
import { useNavigate } from 'react-router-dom';


function HomePage() {

  const { userAuth, isLoading } = useContext(AppContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!userAuth.state) {
        navigate('/login')
      }
    }
  }, [isLoading, userAuth, navigate])

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, show a loading indicator while verifying
  }

  return (
    <div className='homepage-container'>
      <div className="homepage-timeline">
        <TimeLine />
      </div>
    </div>
  )
}

export default HomePage
