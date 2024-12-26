// PhotoViewDTO
export interface PhotoViewDTO {
  postPhotoId: number;
  viewOrder: number;
  imageUrl: string;
}

// ContentDTO
export interface ContentDTO {
  id: number;
  challengeId: number;
  content: string;
  writer: string;
  isPostAuthor: boolean;
  profileUrl: string;
  isAnnouncement: boolean;
  createdAt: string;
  photoViewList: PhotoViewDTO[];
}

// SortDTO
export interface SortDTO {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// PageableDTO
export interface PageableDTO {
  pageNumber: number;
  pageSize: number;
  sort: SortDTO;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// ChallengeContentResponseDTO
export interface ChallengeContentResponseDTO {
  content: ContentDTO[];
  pageNumber: number;
  size: number;
  isLast: boolean;
  isFirst: boolean;
  isEmpty: boolean;
  hasNextPage: boolean;
  pageable: PageableDTO;
}
