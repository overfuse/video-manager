import React from 'react';
import { useLocation } from 'wouter';
import { useAsync } from 'react-use';

import { addVideo, deleteVideo, getVideoById } from '../services/videos';
import { Video } from '../common/interfaces';
import { VideoForm } from './video-form/VideoForm';

type EditVideoProps = {
  authorId: number;
  videoId: number;
};

export const EditVideo: React.FC<EditVideoProps> = ({ authorId, videoId }) => {
  const [location, setLocation] = useLocation();

  const { value: video } = useAsync(() => getVideoById(authorId, videoId));

  const onSubmit = async (newAuthorId: number, newVideo: Video) => {
    await deleteVideo(authorId, videoId);
    await addVideo(newAuthorId, newVideo);
    setLocation('/');
  };

  return (
    <>
      <h1>Edit video: {video && video.name}</h1>
      {video && <VideoForm authorId={authorId} video={video} onSubmit={onSubmit} onCancel={() => setLocation('/')} />}
    </>
  );
};
