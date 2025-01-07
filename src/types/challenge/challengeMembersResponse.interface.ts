export interface MemberDTO {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  isCurrentUser: boolean;
}

export type ChallengeMembersResponseDTO = MemberDTO[];
