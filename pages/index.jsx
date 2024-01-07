import { useContext } from 'react';
import { Context } from '../context';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Auth() {
  const router = useRouter();
  const { userName, password, setUserName, setPassword } = useContext(Context);

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
      .then((r) => router.push('/chats'))
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
