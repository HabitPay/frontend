export interface MemberFeeView {
  nickname: string;
  totalFee: number;
  completionRate: number;
  isMe: boolean;
}

export interface IChallengeFeeListDto {
  totalFee: number;
  myFee: number;
  memberFeeList: MemberFeeView[];
}
