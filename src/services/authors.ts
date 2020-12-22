import { Author, Video } from '../common/interfaces';

export const getAuthors = (): Promise<Author[]> => {
  return fetch(`${process.env.REACT_APP_API}/authors`).then((response) => (response.json() as unknown) as Author[]);
};

export async function getAuthorById(authorId: number): Promise<Author> {
  const res = await fetch(`${process.env.REACT_APP_API}/authors/${authorId}`);
  return (await (res.json() as unknown)) as Author;
}

export async function setAuthorVideos(authorId: number, videos: Video[]) {
  await fetch(`${process.env.REACT_APP_API}/authors/${authorId}`, {
    method: 'PATCH',
    body: JSON.stringify({ videos }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
