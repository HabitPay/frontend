export interface PhotoDTO {
  photoId?: number;
  viewOrder: number;
  imageExtension?: string;
  contentLength?: number;
}

export interface ICreatePostDTO {
  content: string;
  isAnnouncement: boolean;
  photos: PhotoDTO[];
}
