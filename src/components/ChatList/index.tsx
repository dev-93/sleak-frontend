import Chat from '@components/Chat';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/style';
import { IChat, IDM } from '@typings/db';
import React, { FC, RefObject, useCallback, useRef, VFC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

// interface Props {
//   scrollbarRef: RefObject<Scrollbars>;
//   isReachingEnd?: boolean;
//   isEmpty: boolean;
//   chatSections: { [key: string]: (IDM | IChat)[] };
//   setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
// }

interface Props {
  chatData?: IDM[];
}

// const ChatList: FC<Props> = ({ scrollbarRef, isReachingEnd, isEmpty, chatSections, setSize }) => {
const ChatList: VFC<Props> = ({ chatData }) => {
  // const onScroll = useCallback(
  //   (values) => {
  //     if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
  //       setSize((size) => size + 1).then(() => {
  //         scrollbarRef.current?.scrollTop(scrollbarRef.current?.getScrollHeight() - values.scrollHeight);
  //       });
  //     }
  //   },
  //   [setSize, scrollbarRef, isReachingEnd, isEmpty],
  // );
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {chatData?.map((chat) => {
          return <Chat key={chat.id} data={chat} />;
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
