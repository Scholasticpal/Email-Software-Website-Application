import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './component/Login';
import Mail from './component/Mail'; 
import { login, logout, selectUser } from './features/UserSlice';
import {auth} from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL ? authUser.photoURL : "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
          displayName: authUser.displayName ? authUser.displayName: authUser.email,
          email: authUser.email,
          emailVerified: authUser.emailVerified
        }));
      } else{
        dispatch(logout());
      }
      console.log(authUser)
    })
  }, [dispatch])

  return (
    <div className="App">
    {
      user ? <Mail/>: <Login/>
    }
    </div>
  );
}

export default App;
