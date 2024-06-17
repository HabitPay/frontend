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

export const challengeDetailsDtoExample = {
  title: "string",
  description: "string",
  startDate: "string",
  endDate: "string",
  participatingDays: 42,
  feePerAbsence: 42,
  hostNickname: "string",
  hostProfileImage: null,
  isHost: true,
  isEnrolledMember: true,
};
