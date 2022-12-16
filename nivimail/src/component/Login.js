import React from "react";
import { useState } from "react";
import './css/Login.css';
import { auth, provider } from "../firebase";

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(true)

    const handleRegister = (e) => {
        e.preventDefault()
        if(email&&password) {
            auth.createUserWithEmailAndPassword(email,
                password).then((auth) => {
                alert('Registered Succesfully')
            }).catch((e) => alert(e.message))
        } else {
            alert('Please Fill all the fields')
        }
    };


    const handleSignIn = () => {
        auth.signInWithPopup(provider).then((auth) => alert
        ('Signed In Successfully.')).catch((err) =>{ alert(err.message)}) 
    }

    const handleLogin = (e) => {
       e.preventDefault()
       if(email && password){
        auth.signInWithEmailAndPassword(email,password).then((auth) => {
            alert('Logged In Succesfully')
        }).catch((err) => alert(err.message))
       }
    }

    const[register, setRegister] = useState(false);
  return (
    <div className="login">
        
            {register ? (
              <>
                <div className="loginContainer">
                  <div className="logo">
                    <img
                      src={process.env.PUBLIC_URL + '/images/darklogo2.PNG'}
                      alt="logo"
                    />
                    <h3>Register </h3>
                    <p>Create an Account to continue with niviMail</p>
                  </div>
                  <div className="loginContent">
                    <input
                      value={email}
                      required={true}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Email"
                    />
                    <input
                      value={password}
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                    <button type="submit" onClick={handleRegister}>
                      Register
                    </button>
                    <button onClick={handleSignIn}>
                      Continue using Google
                    </button>
                  </div>
                  <p onClick={() => setRegister(false)}>Existing User? Login Here.</p>
                </div>
              </>) : (<>
                <div className="loginContainer">
                  <div className="logo">
                    <img
                      src={process.env.PUBLIC_URL + '/images/darklogo2.PNG'}
                      alt="logo"
                    />
                    <h3>Sign in </h3>
                    <p>to continue to niviMail</p>
                  </div>
                  <div className="loginContent">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Email"
                    />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                    <button type="submit" onClick={handleLogin}>
                      Login
                    </button>
                    <button onClick={handleSignIn}>
                      Continue using Google
                    </button>
                  </div>
                  <p onClick={() => setRegister(true)}>New User? Register Here.</p>
                </div>
              </>)
              }
    </div>
  );
}

export default Login;
