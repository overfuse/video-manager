import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

type FormRowProps = {
  label: string;
  children: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  wide: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export const FormRow: React.FC<FormRowProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={2}>
        {props.label}
      </Grid>
      <Grid item xs={10} className={classes.wide}>
        {props.children}
      </Grid>
    </>
  );
};
