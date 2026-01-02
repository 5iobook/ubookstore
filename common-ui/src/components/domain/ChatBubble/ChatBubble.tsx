import React from 'react';
import './ChatBubble.css';

export interface ChatBubbleProps {
  message: string;
  timestamp: Date;
  isMine: boolean;
  sender?: {
    name: string;
    avatar?: string;
  };
  status?: 'sending' | 'sent' | 'read';
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  timestamp,
  isMine,
  sender,
  status = 'sent',
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderAvatar = () => {
    if (isMine || !sender) return null;

    if (sender.avatar) {
      return (
        <img
          src={sender.avatar}
          alt={sender.name}
          className="chat-bubble__avatar-image"
        />
      );
    }

    const initial = sender.name.charAt(0).toUpperCase();
    return (
      <div className="chat-bubble__avatar-placeholder">
        <span className="chat-bubble__avatar-initial">{initial}</span>
      </div>
    );
  };

  const renderStatus = () => {
    if (!isMine) return null;

    const statusIcons = {
      sending: '⏱',
      sent: '✓',
      read: '✓✓',
    };

    return (
      <span className={`chat-bubble__status chat-bubble__status--${status}`}>
        {statusIcons[status]}
      </span>
    );
  };

  return (
    <div className={`chat-bubble ${isMine ? 'chat-bubble--mine' : 'chat-bubble--theirs'}`}>
      {!isMine && (
        <div className="chat-bubble__avatar">
          {renderAvatar()}
        </div>
      )}

      <div className="chat-bubble__content-wrapper">
        {!isMine && sender && (
          <span className="chat-bubble__sender-name">{sender.name}</span>
        )}
        
        <div className="chat-bubble__message-row">
          {isMine && (
            <div className="chat-bubble__meta chat-bubble__meta--left">
              <time className="chat-bubble__time" dateTime={timestamp.toISOString()}>
                {formatTime(timestamp)}
              </time>
              {renderStatus()}
            </div>
          )}

          <div className="chat-bubble__bubble">
            <p className="chat-bubble__text">{message}</p>
          </div>

          {!isMine && (
            <div className="chat-bubble__meta chat-bubble__meta--right">
              <time className="chat-bubble__time" dateTime={timestamp.toISOString()}>
                {formatTime(timestamp)}
              </time>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
