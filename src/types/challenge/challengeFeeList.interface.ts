export interface MemberFeeView {
  nickname: string; // 멤버 닉네임
  totalFee: number; // 챌린지 내 멤버의 누적 벌금 총합
  completionRate: number; // 챌린지 내 멤버의 달성률
}

export interface IChallengeFeeListDto {
  totalFee: number; // 챌린지 내 전체 누적 벌금 총합
  myFee: number; // 챌린지 내 나의 누적 벌금 총합
  memberFeeList: MemberFeeView[]; // 멤버별 벌금 현황 목록
}
