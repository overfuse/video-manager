import React, { useEffect } from 'react';
import { Grid, OutlinedInput, Select } from '@material-ui/core';
import { FormRow } from './video-form/FormRow';
import { useAsync } from 'react-use';
import { getAuthors } from '../services/authors';
import { getCategories } from '../services/categories';

export const AddVideo: React.FC = () => {
  const { value: authors = [] } = useAsync(() => getAuthors(), []);
  const { value: categories = [] } = useAsync(() => getCategories(), []);

  return (
    <>
      <h1>Add video</h1>
      <Grid container>
        <FormRow label="Video name">
          <OutlinedInput placeholder="Video name" margin="dense" />
        </FormRow>
        <FormRow label="Video author">
          <Select native placeholder="Video author" variant="outlined" margin="dense">
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Select>
        </FormRow>
        <FormRow label="Video category">
          <Select multiple native value={[]} variant="outlined">
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </FormRow>
      </Grid>
    </>
  );
};
