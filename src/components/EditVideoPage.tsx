import React from 'react';
import { useRoute } from 'wouter';
import { EditVideo } from './EditVideo';

export const EditVideoPage: React.FC = () => {
  const [match, params] = useRoute<{ authorId: string; videoId: string }>('/authors/:authorId/videos/:videoId');

  return match && params ? <EditVideo authorId={parseInt(params.authorId)} videoId={parseInt(params.videoId)} /> : null;
};
