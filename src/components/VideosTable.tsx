import React from 'react';
import { Link } from 'wouter';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import { ProcessedVideo } from '../common/interfaces';
import { Actions } from './Actions';
import { format } from 'date-fns';

interface VideosTableProps {
  videos: ProcessedVideo[];
  onDelete: (video: ProcessedVideo) => void;
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const VideosTable: React.FC<VideosTableProps> = ({ videos, onDelete }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Video Name</StyledTableCell>
            <StyledTableCell>Author</StyledTableCell>
            <StyledTableCell>Categories</StyledTableCell>
            <StyledTableCell>Highest quality format</StyledTableCell>
            <StyledTableCell>Release date</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <StyledTableRow key={video.id}>
              <StyledTableCell component="th" scope="row">
                {video.name}
              </StyledTableCell>
              <StyledTableCell>{video.author}</StyledTableCell>
              <StyledTableCell>{video.categories.join(', ')}</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>{video.releaseDate && format(video.releaseDate, 'dd.LL.yyyy')}</StyledTableCell>
              <StyledTableCell>
                <Actions>
                  <Link href={`/authors/${video.authorId}/videos/${video.id}`}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="contained" color="secondary" onClick={() => onDelete(video)}>
                    Delete
                  </Button>
                </Actions>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
