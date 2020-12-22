import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Grid, OutlinedInput } from '@material-ui/core';
import { VideosTable } from './VideosTable';
import lunr from 'lunr';
import { deleteVideo, getVideos } from '../services/videos';
import { useAsyncFn } from 'react-use';
import { DeleteModal } from './DeleteModal';
import { ProcessedVideo } from '../common/interfaces';

export const VideosOverview: React.FC = () => {
  const [{ value: videos = [] }, fetchVideos] = useAsyncFn(() => getVideos(), []);
  const [search, setSearch] = useState<string>('');
  const [index, setIndex] = useState<lunr.Index>();

  const [deletingVideo, setDeletingVideo] = useState<ProcessedVideo | null>(null);
  function onDelete(video: ProcessedVideo) {
    setDeletingVideo(video);
  }
  function onCancelDeleting() {
    setDeletingVideo(null);
  }

  useEffect(() => {
    fetchVideos();
  }, []);

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

  async function onDeleteConfirm() {
    if (deletingVideo) {
      await deleteVideo(deletingVideo.authorId, deletingVideo.id);
      fetchVideos();
      setDeletingVideo(null);
    }
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
      <VideosTable videos={searchVideos()} onDelete={onDelete} />
      <DeleteModal open={!!deletingVideo} onDelete={onDeleteConfirm} onClose={onCancelDeleting} />
    </Grid>
  );
};
