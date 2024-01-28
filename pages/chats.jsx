import { Context } from '../context';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState, useEffect, useContext } from 'react';

const ChatEngine = dynamic(() =>
  import('react-chat-engine').then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import('react-chat-engine').then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { userName, setUserName, password, setPassword } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (userName === '' || password === '') {
      router.push('/');
    }
  }, [userName, password]);

  function handleSignOut() {
    setUserName('');
    setPassword('');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  if (!showChat) return <div />;

  return (
    <div className="background">
      <button type="general" className="signout" onClick={handleSignOut}>
        Sign Out
      </button>
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID="b40ed151-27de-4aec-a0e1-d721ea4a5ce5"
          userName={userName}
          userSecret={password}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
