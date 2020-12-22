import React from 'react';
import { Button, makeStyles, Modal } from '@material-ui/core';

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
  open?: boolean;
  onDelete?: () => void;
  onClose?: () => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({ open, onDelete, onClose }) => {
  const classes = useStyles();

  return (
    <Modal open={!!open} onClose={onClose}>
      <div className={classes.body}>
        <h3>Are you sure to delete the video?</h3>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="contained" color="default" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
