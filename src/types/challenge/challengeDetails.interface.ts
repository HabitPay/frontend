export interface IChallengeDetailsDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  numberOfParticipants: number;
  participatingDays: number;
  feePerAbsence: number;
  totalAbsenceFee: number;
  isPaidAll: boolean;
  hostNickname: string;
  enrolledMembersProfileImageList: string[];
  isHost: boolean;
  isMemberEnrolledInChallenge: boolean;
}
