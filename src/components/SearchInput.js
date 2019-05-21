import React from 'react';
import { Input } from '@smooth-ui/core-sc';

import { useT } from './I18n';

export default props => (
  <Input
    placeholder={useT('placeholder')}
    width="100%"
    type="search"
    {...props}
  />
);
