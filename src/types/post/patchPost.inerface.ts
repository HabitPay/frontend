import { PhotoDTO } from "./createPost.interface";

export interface IPatchPostDTO {
  content: string;
  isAnnouncement: boolean;
  photos: PhotoDTO[];
  isPhotosUpdated: boolean;
}
