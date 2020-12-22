import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { addVideo } from '../services/videos';
import { Video } from '../common/interfaces';
import { VideoForm } from './video-form/VideoForm';
import { formatISO } from 'date-fns';

export const AddVideo: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [video, setVideo] = useState<Video>(() => ({
    id: +new Date(),
    name: '',
    catIds: [],
    releaseDate: formatISO(new Date(), { representation: 'date' }),
  }));

  const onSubmit = async (authorId: number, video: Video) => {
    await addVideo(authorId, video);
    setLocation('/');
  };

  return (
    <>
      <h1>Add video</h1>
      <VideoForm video={video} onSubmit={onSubmit} onCancel={() => setLocation('/')} />
    </>
  );
};
