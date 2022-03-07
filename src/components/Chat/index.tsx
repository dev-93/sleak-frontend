import { ChatWrapper } from '@components/Chat/style';
import { IChat, IDM, IUser } from '@typings/db';
import dayjs from 'dayjs';
import gravatar from 'gravatar';
import React, { FC, memo } from 'react';

interface Props {
  data: IDM | IChat;
}

const Chat: FC<Props> = memo(({ data }) => {
  const user: IUser = 'Sender' in data ? data.Sender : data.User;

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{data.content}</p>
      </div>
    </ChatWrapper>
  );
});

export default Chat;
