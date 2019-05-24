import React from 'react';
import ReactDOM from 'react-dom';

const Portal = props => {
  const { container, children, disablePortal, onRender } = props;
  const [mountNode, setMountNode] = React.useState(null);

  React.useEffect(() => {
    setMountNode(container || document.body);
  }, [container]);

  React.useEffect(() => {
    if (onRender) {
      onRender();
    }
  }, [onRender]);

  if (disablePortal) {
    return children;
  }

  return mountNode ? ReactDOM.createPortal(children, container) : null;
};

export default Portal;
