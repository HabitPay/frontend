import { PhotoViewDTO } from "../challenge";

export interface IPostDetailsDto {
  id: number;
  challengeId: number;
  content: string;
  writer: string;
  isPostAuthor: boolean;
  profileUrl: string;
  isAnnouncement: false;
  createdAt: string;
  photoViewList: PhotoViewDTO[];
}
