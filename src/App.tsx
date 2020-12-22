import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Link, Route, Switch } from 'wouter';

import { AddVideo } from './components/AddVideo';
import { VideosOverview } from './components/VideosOverview';
import { EditVideoPage } from './components/EditVideoPage';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6">Videos</Typography>
          </Link>
          <div className={classes.grow} />
          <Route path="/">
            <Link href="/add-video">
              <Button variant="contained" color="default">
                Add video
              </Button>
            </Link>
          </Route>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route path="/">
            <VideosOverview />
          </Route>
          <Route path="/add-video">
            <AddVideo />
          </Route>
          <Route path="/authors/:authorId/videos/:videoId">
            <EditVideoPage />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
