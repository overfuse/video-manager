import React from 'react';
import { Button, makeStyles, Modal } from '@material-ui/core';
import { ProcessedVideo } from '../common/interfaces';
import { Actions } from './Actions';

const useStyles = makeStyles((theme) => ({
  body: {
    top: 'calc(50% - 200px)',
    left: '50%',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

type DeleteModalProps = {
  video: ProcessedVideo | null;
  onDelete?: () => void;
  onClose?: () => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ video, onDelete, onClose }) => {
  const classes = useStyles();

  return (
    <Modal open={!!video} onClose={onClose}>
      <div className={classes.body}>
        <h2>Delete video: {video?.name}?</h2>
        <Actions>
          <Button variant="contained" color="secondary" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="contained" color="default" onClick={onClose}>
            Cancel
          </Button>
        </Actions>
      </div>
    </Modal>
  );
};
