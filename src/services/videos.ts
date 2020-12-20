import { getCategories } from './categories';
import { getAuthors } from './authors';
import { Author, Category, ProcessedVideo, Video } from '../common/interfaces';

export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise.all([getCategories(), getAuthors()]).then(([categories, authors]) => {
    const catByIds = categories.reduce<CategoryById>((catByIds, cat) => {
      catByIds[cat.id] = cat;
      return catByIds;
    }, {});

    return authors.flatMap((author) => processAuthorVideos(author, catByIds));
  });
};

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
