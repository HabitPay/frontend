interface IIsCompleteTodayProps {
  complete: boolean;
}

const IsCompleteToday = ({ complete }: IIsCompleteTodayProps) => {
  return complete ? (
    <span className="mt-5 text-center text-habit-green">
      오늘은 챌린지에 참여완료 하셨습니다.
    </span>
  ) : (
    <span className="mt-5 text-sm text-center text-red-600">
      오늘은 챌린지에 참여하지 않으셨습니다!
      <br />
      챌린지 인증 글을 작성해주세요.
    </span>
  );
};

export default IsCompleteToday;
