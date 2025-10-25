import React from 'react';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'bot';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender }) => {
  return (
    <div className={`message-bubble ${sender}`}>
      {text}
    </div>
  );
};

export default MessageBubble;