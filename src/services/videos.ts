import { parseISO } from 'date-fns';
import { Author, Category, HightestVideoFormat, ProcessedVideo, Video, VideoFormat, VideoFormatCollection } from '../common/interfaces';
import { getCategories } from './categories';
import { getAuthorById, getAuthors, setAuthorVideos } from './authors';

export function getVideos(): Promise<ProcessedVideo[]> {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    const videos = getProcessedVideos(authors, categories);
    videos.sort((a, b) => a.id - b.id);
    return videos;
  });
}

export async function addVideo(authorId: number, video: Video) {
  const author = await getAuthorById(authorId);
  await setAuthorVideos(authorId, [...author.videos, video]);
}

export async function getVideoById(authorId: number, videoId: number): Promise<Video | undefined> {
  const author = await getAuthorById(authorId);
  return author.videos.find((video) => video.id === videoId);
}

export async function deleteVideo(authorId: number, videoId: number) {
  const author = await getAuthorById(authorId);
  const updatedVideos = [...author.videos.filter((video) => video.id !== videoId)];
  await setAuthorVideos(authorId, updatedVideos);
}

export function getProcessedVideos(authors: Author[], categories: Category[]): ProcessedVideo[] {
  const catByIds = categories.reduce<CategoryById>((catByIds, cat) => {
    catByIds[cat.id] = cat;
    return catByIds;
  }, {});

  return authors.flatMap((author) => processAuthorVideos(author, catByIds));
}

interface CategoryById {
  [catId: number]: Category;
}

function processAuthorVideos(author: Author, catByIds: CategoryById): ProcessedVideo[] {
  return author.videos.map((video: Video) => ({
    id: video.id,
    name: video.name,
    author: author.name,
    authorId: author.id,
    categories: video.catIds.map((catId) => catByIds[catId]?.name),
    highestFormat: video.formats && getHighestVideoFormat(video.formats),
    releaseDate: video.releaseDate && parseISO(video.releaseDate),
  }));
}

function getHighestVideoFormat(formats: VideoFormatCollection): HightestVideoFormat | undefined {
  let highestFormat;

  for (const [name, format] of Object.entries(formats)) {
    if (!highestFormat || format.size > highestFormat.size) {
      highestFormat = { ...format, name };
    }
  }

  return highestFormat;
}
