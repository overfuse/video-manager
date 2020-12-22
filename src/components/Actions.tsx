import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  actions: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export const Actions: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.actions}>{children}</div>;
};
