import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { addVideo } from '../services/videos';
import { Video } from '../common/interfaces';
import { VideoForm } from './video-form/VideoForm';

export const AddVideo: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [video, setVideo] = useState<Video>(() => ({ id: +new Date(), name: '', catIds: [] }));

  const onSubmit = (authorId: number, video: Video) => {
    addVideo(authorId, video).then(() => setLocation('/'));
  };

  return (
    <>
      <h1>Add video</h1>
      <VideoForm video={video} onSubmit={onSubmit} onCancel={() => setLocation('/')} />
    </>
  );
};
