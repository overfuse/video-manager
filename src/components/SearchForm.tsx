import React, { useState } from 'react';
import { Button, ButtonGroup, OutlinedInput } from '@material-ui/core';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  }

  return (
    <ButtonGroup>
      <OutlinedInput margin="dense" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
      <Button variant="contained" color="primary" onClick={() => onSearch(query)}>
        Search
      </Button>
    </ButtonGroup>
  );
};
