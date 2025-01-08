// Challenge Content Interface
export interface ChallengeListContentDTO {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  stopDate: string | null;
  numberOfParticipants: number;
  participatingDays: number;
  totalParticipatingDaysCount: number;
  isStarted: boolean;
  isEnded: boolean;
  hostNickname: string;
  hostProfileImage: string;
}

// Pagination Data Interface
export interface ChallengeListResponseDTO {
  content: ChallengeListContentDTO[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNextPage: boolean;
}
