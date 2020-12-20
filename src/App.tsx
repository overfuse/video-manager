import React, { useEffect, useState } from 'react';
import {
  AppBar,
  ButtonGroup,
  Button,
  Container,
  OutlinedInput,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { ProcessedVideo } from './common/interfaces';
import lunr from "lunr";

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [search, setSearch] = useState<string>('');
  const [index, setIndex] = useState<lunr.Index>();

  useEffect(() => {
    getVideos()
      .then((videos) => {
        setVideos(videos);
      });
  }, []);

  useEffect(() => {
    const index = lunr(function() {
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
        const resIds = res.map(x => parseInt(x.ref));
        return videos.filter(v => resIds.includes(v.id));
      }
    }

    return videos;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
          <div className={classes.grow} />
          <Button variant="contained" color="default">Add video</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h3">
          VManager Demo v0.0.1
        </Typography>
        <ButtonGroup>
          <OutlinedInput margin="dense" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </ButtonGroup>
        <VideosTable videos={searchVideos()} />
      </Container>
    </>
  );
};

export default App;
