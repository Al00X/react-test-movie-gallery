export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  dates?: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  id: number;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: false;
  vote_average: number;
}

export interface UIMovie extends IMovie {
  comment?: string;
  favorite?: boolean;
}
