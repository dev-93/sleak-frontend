import React, { useCallback, useRef } from 'react';
import { Container, Header } from './style';
import useSWR from 'swr';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { IDM } from '@typings/db';
import makeSection from '@utils/makeSection';
import useSWRInfinite from 'swr/infinite';
import Scrollbars from 'react-custom-scrollbars-2';

const PAGE_SIZE = 20;
const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const {
    data: chatData,
    error,
    isValidating,
    mutate: mutateChat,
    size,
    setSize,
  } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher,
  );

  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);
  const scrollbarRef = useRef<Scrollbars>(null);
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim() && chatData) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            mutateChat();
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat, workspace, id, myData, userData, chatData, mutateChat, setChat],
  );

  if (!userData || !myData) {
    return null;
  }

  const chatSections = makeSection(
    chatData
      ? ([] as IDM[])
          .concat(...chatData)
          .flat()
          .reverse()
      : [],
  );

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      {/* <ChatList chatSections={chatSections} ref={scrollbarRef} setSize={setSize} /> */}
      <ChatList
        ref={scrollbarRef}
        isReachingEnd={isReachingEnd}
        isEmpty={isEmpty}
        chatSections={chatSections}
        setSize={setSize}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} placeholder="입력해주세요" />
    </Container>
  );
};

export default DirectMessage;
