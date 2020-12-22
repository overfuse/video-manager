import React, { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import lunr from 'lunr';

import { ProcessedVideo } from '../common/interfaces';
import { deleteVideo, getVideos } from '../services/videos';

import { VideosTable } from './VideosTable';
import { DeleteModal } from './DeleteModal';
import { SearchForm } from './SearchForm';

export const VideosOverview: React.FC = () => {
  const [{ value: videos = [] }, fetchVideos] = useAsyncFn(() => getVideos(), []);
  useEffect(() => {
    fetchVideos();
  }, []);

  const [search, setSearch] = useState<string>('');
  const [index, setIndex] = useState<lunr.Index>();

  const [deletingVideo, setDeletingVideo] = useState<ProcessedVideo | null>(null);
  function onDelete(video: ProcessedVideo) {
    setDeletingVideo(video);
  }
  function onCancelDeleting() {
    setDeletingVideo(null);
  }
  async function onDeleteConfirm() {
    if (deletingVideo) {
      await deleteVideo(deletingVideo.authorId, deletingVideo.id);
      fetchVideos();
      setDeletingVideo(null);
    }
  }

  useEffect(() => {
    const index = lunr(function () {
      this.ref('id');
      this.field('name');
      this.field('author');

      for (const video of videos) {
        this.add(video);
      }
    });
    setIndex(index);
  }, [videos]);

  function searchVideos() {
    if (search && index) {
      const res = index.search(search);
      if (res.length) {
        const resIds = res.map((x) => parseInt(x.ref));
        return videos.filter((v) => resIds.includes(v.id));
      }
      return [];
    }

    return videos;
  }

  return (
    <>
      <h1>VManager Demo v0.0.1</h1>
      <SearchForm onSearch={(query) => setSearch(query)} />
      <VideosTable videos={searchVideos()} onDelete={onDelete} />
      <DeleteModal video={deletingVideo} onDelete={onDeleteConfirm} onClose={onCancelDeleting} />
    </>
  );
};
