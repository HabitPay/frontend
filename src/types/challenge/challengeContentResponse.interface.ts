// PhotoViewDTO
export interface PhotoViewDTO {
  postPhotoId: number;
  viewOrder: number;
  imageUrl: string;
}

// ContentDTO
export interface ContentDTO {
  id: number;
  challengeEnrollmentId: number;
  content: string;
  writer: string;
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
  pageable: PageableDTO;
  size: number;
  number: number;
  sort: SortDTO;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
