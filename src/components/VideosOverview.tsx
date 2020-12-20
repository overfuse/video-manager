import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Grid, OutlinedInput } from '@material-ui/core';
import { VideosTable } from './VideosTable';
import lunr from 'lunr';
import { getVideos } from '../services/videos';
import { useAsync } from 'react-use';

export const VideosOverview: React.FC = () => {
  const { value: videos = [] } = useAsync(() => getVideos(), []);
  const [search, setSearch] = useState<string>('');
  const [index, setIndex] = useState<lunr.Index>();

  useEffect(() => {
    const index = lunr(function () {
      this.ref('id');
      this.field('name');
      this.field('author');

      for (const video of videos) {
        this.add(video);
      }
    });
    setIndex(index);
  }, [videos]);

  function searchVideos() {
    if (search && index) {
      const res = index.search(search);
      if (res.length) {
        const resIds = res.map((x) => parseInt(x.ref));
        return videos.filter((v) => resIds.includes(v.id));
      }
    }

    return videos;
  }

  return (
    <Grid container direction="column">
      <h1>VManager Demo v0.0.1</h1>
      <ButtonGroup>
        <OutlinedInput margin="dense" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" color="primary">
          Search
        </Button>
      </ButtonGroup>
      <VideosTable videos={searchVideos()} />
    </Grid>
  );
};
