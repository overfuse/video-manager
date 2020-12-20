import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';
import { getCategories } from './categories';
import { getAuthors } from './authors';

export function getVideos(): Promise<ProcessedVideo[]> {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    return getProcessedVideos(authors, categories);
  });
}

export async function addVideo(authorId: number, video: Video) {
  await fetch(`${process.env.REACT_APP_API}/authors/${authorId}/videos`, {
    method: 'POST',
    body: JSON.stringify(video),
  });
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
    categories: video.catIds.map((catId) => catByIds[catId]?.name),
  }));
}
