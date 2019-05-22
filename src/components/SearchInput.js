import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Input } from '@smooth-ui/core-sc';

import { useT } from './I18n';

export default forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return (
    <Input
      ref={inputRef}
      placeholder={useT('placeholder')}
      width="100%"
      type="search"
      {...props}
    />
  );
});
