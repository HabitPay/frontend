export interface MemberFeeView {
  nickname: string;
  totalFee: number;
  completionRate: number;
  isCurrentUser: boolean;
}

export interface IChallengeFeeListDto {
  totalFee: number;
  myFee: number;
  memberFeeList: MemberFeeView[];
}
