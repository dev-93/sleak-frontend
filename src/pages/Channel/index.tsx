import React, { useCallback } from 'react';
import { Container, Header } from '@pages/Channel/style';
import useInput from '@hooks/useInput';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setChat('');
  }, []);

  return (
    <Container>
      <Header>채널</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} placeholder="입력해주세요" />
    </Container>
  );
};

export default Channel;
