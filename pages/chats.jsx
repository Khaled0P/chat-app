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
  const { userName, password } = useContext(Context);
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

  if (!showChat) return <div />;
  console.log(ChatEngine);
  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID="6a270ce1-3722-4545-b5f5-de947a6d6051"
          userName={userName}
          userSecret={password}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
