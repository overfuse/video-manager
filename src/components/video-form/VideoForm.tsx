import React, { useEffect, useMemo, useState } from 'react';
import { FormRow } from './FormRow';
import { Button, Grid, OutlinedInput } from '@material-ui/core';
import Select, { ValueType } from 'react-select';
import { useAsync } from 'react-use';
import { getAuthors } from '../../services/authors';
import { getCategories } from '../../services/categories';
import { Author, Category, Video } from '../../common/interfaces';

export const VideoForm: React.FC<VideoFormProps> = ({ authorId, video, onSubmit, onCancel }) => {
  const [name, setName] = useState(video.name);
  const [selectedAuthor, setAuthor] = useState<ValueType<OptionType, false> | null>(null);
  const [selectedCats, setCats] = useState<ValueType<OptionType, true>>([]);

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
    <Grid container>
      <FormRow label="Video name">
        <OutlinedInput placeholder="Video name" margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
      </FormRow>
      <FormRow label="Video author">
        <Select value={selectedAuthor} onChange={(selected) => setAuthor(selected)} options={authorOptions} />
      </FormRow>
      <FormRow label="Video category">
        <Select isMulti value={selectedCats} onChange={(cats) => setCats(cats)} options={catetoryOptions} />
      </FormRow>
      <FormRow>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="default" onClick={onCancel}>
          Cancel
        </Button>
      </FormRow>
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
