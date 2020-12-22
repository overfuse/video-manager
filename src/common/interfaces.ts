export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats?: VideoFormatCollection;
  releaseDate?: string;
}

export interface VideoFormatCollection {
  [name: string]: VideoFormat;
}

export interface VideoFormat {
  res: string;
  size: number;
}

export interface HightestVideoFormat {
  name: string;
  res: string;
  size: number;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  authorId: number;
  categories: string[];
  highestFormat?: HightestVideoFormat;
  releaseDate?: Date | '';
}
