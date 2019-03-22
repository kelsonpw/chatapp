import React, { useEffect, useRef } from 'react';

const propTypes = {};

// Used to update the scroll of the chat if new message is added.
// Wont force scroll if the user has scrolled up from the bottom

function ChatScroller(props) {
  // refs
  const ref = useRef();
  const shouldScrollRef = useRef(true);

  // internal methods/hooks
  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  // scroll handler
  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, scrollHeight, clientHeight } = node;
    const atBottom = scrollHeight === clientHeight + scrollTop;
    shouldScrollRef.current = atBottom;
  };

  // render
  return <div {...props} ref={ref} onScroll={handleScroll} />;
}

ChatScroller.propTypes = propTypes;

export default ChatScroller;
