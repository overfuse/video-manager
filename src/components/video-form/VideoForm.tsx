import React, { useEffect, useMemo, useState } from 'react';
import { useAsync } from 'react-use';
import { Button, FormControl, Grid, OutlinedInput, Typography } from '@material-ui/core';
import Select, { ValueType } from 'react-select';

import { getAuthors } from '../../services/authors';
import { getCategories } from '../../services/categories';
import { Author, Category, Video } from '../../common/interfaces';

import { FormRow } from './FormRow';
import { Actions } from '../Actions';

export const VideoForm: React.FC<VideoFormProps> = ({ authorId, video, onSubmit, onCancel }) => {
  const [name, setName] = useState(video.name);
  const [selectedAuthor, setAuthor] = useState<ValueType<OptionType, false> | null>(null);
  const [selectedCats, setCats] = useState<ValueType<OptionType, true>>([]);

  const isValid = !!name && !!selectedAuthor && !!selectedCats?.length;

  const { value: authors = [] } = useAsync(() => getAuthors(), []);
  const { value: categories = [] } = useAsync(() => getCategories(), []);

  useEffect(() => {
    const selectedAuthor = authors.find((author) => author.id === authorId);
    if (selectedAuthor) {
      setAuthor(getOption(selectedAuthor));
    }
  }, [authors]);

  useEffect(() => {
    const selectedCats = categories.filter((cat) => video.catIds.includes(cat.id)).map((cat) => getOption(cat));
    setCats(selectedCats);
  }, [categories]);

  const authorOptions = useMemo(() => authors.map((author) => getOption(author)), [authors]);
  const catetoryOptions = useMemo(() => categories.map((cat) => getOption(cat)), [categories]);

  const handleSubmit = () => {
    if (selectedAuthor && selectedCats) {
      onSubmit(selectedAuthor.value, { id: video.id, name, catIds: selectedCats.map((cat) => cat.value) });
    }
  };

  return (
    <Grid container spacing={2}>
      <FormRow label="Video name">
        <FormControl fullWidth>
          <OutlinedInput placeholder="Video name" margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
      </FormRow>
      <FormRow label="Video author">
        <Select
          value={selectedAuthor}
          placeholder="Select author..."
          onChange={(selected) => setAuthor(selected)}
          options={authorOptions}
        />
      </FormRow>
      <FormRow label="Video category">
        <Select
          isMulti
          value={selectedCats}
          placeholder="Select categories..."
          onChange={(cats) => setCats(cats)}
          options={catetoryOptions}
        />
      </FormRow>
      <FormRow>
        <Actions>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isValid}>
            Submit
          </Button>
          <Button variant="contained" color="default" onClick={onCancel}>
            Cancel
          </Button>
        </Actions>
      </FormRow>
      {!isValid && (
        <FormRow>
          <Typography color="error">All fields are mandatory</Typography>
        </FormRow>
      )}
    </Grid>
  );
};

type VideoFormProps = {
  authorId?: number;
  video: Video;
  onSubmit: SubmitCallback;
  onCancel?: () => void;
};

export type SubmitCallback = (authorId: number, video: Video) => void;

type OptionType = {
  label: string;
  value: number;
};

function getOption(item: Author | Category): OptionType {
  return { label: item.name, value: item.id };
}
