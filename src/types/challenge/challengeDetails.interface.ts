export interface IChallengeDetailsDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  participatingDays: number;
  feePerAbsence: number;
  hostNickname: string;
  hostProfileImage: string | null;
  isHost: boolean;
  isEnrolledMember: boolean;
}
