import {
  Header,
  RightMenu,
  ProfileImg,
  WorkspaceWrapper,
  Workspaces,
  Channels,
  WorkspaceName,
  Chats,
  MenuScroll,
  ProfileModal,
  LogOutButton,
} from '@layouts/Workspace/style';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar';
import loadble from '@loadable/component';
import Menu from '@components/Menu';

const Channel = loadble(() => import('@pages/Channel'));
const DirectMessage = loadble(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [showuserMenu, setShowUserMenu] = useState(false);

  const onLogOut = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  const onclickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  if (!data) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onclickUserProfile}>
            <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })} alt="data.nickname" />
            {showuserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showuserMenu} onCloseModal={onclickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data.nickname, { s: '36 px', d: 'retro' })} alt="data.nickname" />
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel" element={<Channel />} />
            <Route path="/dm" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
