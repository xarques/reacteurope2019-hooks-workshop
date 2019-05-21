import React from 'react';
import { Input } from '@smooth-ui/core-sc';

export default props => (
  <Input
    placeholder="Type something..."
    width="100%"
    type="search"
    {...props}
  />
);
