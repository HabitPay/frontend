import { PhotoDTO } from "./createPost.interface";

export interface IPatchPostDTO {
  content: string;
  isAnnouncement: boolean;
  newPhotos: PhotoDTO[];
  modifiedPhotos: PhotoDTO[];
  deletedPhotoIds: number[];
}
