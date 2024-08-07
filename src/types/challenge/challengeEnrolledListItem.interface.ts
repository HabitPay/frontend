export interface IChallengeEnrolledListItemDto {
  challengeId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  stopDate: string;
  totalParticipatingDaysCount: number;
  numberOfParticipants: number;
  participatingDays: number;
  totalFee: number;
  isPaidAll: boolean;
  hostProfileImage: string | null;
  isMemberGivenUp: boolean;
  successCount: number;
  isTodayParticipatingDay: boolean;
  isParticipatedToday: boolean;
}
