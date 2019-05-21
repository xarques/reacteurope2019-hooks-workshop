import React, { useState } from 'react';
import { Normalize, Grid, Typography } from '@smooth-ui/core-sc';

import SearchInput from './components/SearchInput';

function App() {
  const [value, setValue] = useState('');

  return (
    <>
      {/* The "Grid" component centers the child in the page, "py" means "padding-top" and "padding-bottom" */}
      <Grid py={200}>
        {/* Normalize the CSS output between the different browsers */}
        <Normalize />
        {/* a "Typography" composant with ready to use variants */}
        <Typography variant="display-1">Smooth Movie</Typography>
        <SearchInput
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <p>Search : {value}</p>
      </Grid>
    </>
  );
}

export default App;
