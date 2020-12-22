import React from 'react';
import { Grid } from '@material-ui/core';

type FormRowProps = {
  label?: string;
  children: React.ReactNode;
};

export const FormRow: React.FC<FormRowProps> = (props) => {
  return (
    <>
      <Grid item xs={2}>
        {props.label}
      </Grid>
      <Grid item xs={10}>
        {props.children}
      </Grid>
    </>
  );
};
