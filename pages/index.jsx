import { useContext, useEffect } from 'react';
import { Context } from '../context';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Auth() {
  const router = useRouter();
  const { userName, password, setUserName, setPassword } = useContext(Context);

  // check local storage for user auth
  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUserName && storedPassword) {
      setUserName(storedUserName);
      setPassword(storedPassword);
      router.push('/chats');
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!userName.length || !password.length) return; // prevent submitting without data
    axios
      .put(
        'https://api.chatengine.io/users/',
        {
          username: userName,
          secret: password,
        },
        { headers: { 'PRIVATE-KEY': process.env.NEXT_PUBLIC_CHAT_API_KEY } }
      )
      .then((r) => {
        //save auth in local storage
        localStorage.setItem('username', userName);
        localStorage.setItem('password', password);
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('password'));
        router.push('/chats');
      })
      .catch((error) => {
        console.error('Error during authentication:', error);
      });
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form action="" className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-title">Chat App</div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Email"
              className="text-input"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="submit-button" type="submit">
            Login / Signup
          </button>
        </form>
      </div>
    </div>
  );
}
