import React, { useRef, useEffect } from 'react';
import { Input } from '@smooth-ui/core-sc';

import { useT } from './I18n';

export default props => {
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  return (
    <Input
      ref={inputRef}
      placeholder={useT('placeholder')}
      width="100%"
      type="search"
      {...props}
    />
  );
};
