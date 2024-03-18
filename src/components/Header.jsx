import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from "../main"
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated , loading,setLoading} = useContext(Context);
  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      await axios.get(
        `${server}/users/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("logout Successfully");
      setIsAuthenticated(false)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true)
    }
  };



  return <nav className='header'>
    <div>
      <h2>
        TODO App
      </h2>
    </div>
    <article>
      <Link to={'/'}>Home</Link>
      <Link to={'/profile'}>Profile</Link>
      {
        isAuthenticated ? <button className='btn' onClick={logoutHandler} disabled={loading} >Logout</button> :
          <Link to={'/login'}>login</Link>
      }
    </article>
  </nav>
}

export default Header