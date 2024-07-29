import { useState } from "react";

import { HttpStatusCode } from "axios";

import apiManager from "@/api/apiManager";
import Button from "@/app/components/button";
import { useSetRecoilState } from "recoil";
import { toastPopupAtom } from "@/hooks/atoms";

interface IEnrollmentProps {
  id: string;
  isMemberEnrolledInChallenge: boolean;
}

const Enrollment = ({ id, isMemberEnrolledInChallenge }: IEnrollmentProps) => {
  const [
    isMemberEnrolledInChallengeState,
    setIsMemberEnrolledInChallengeState,
  ] = useState<boolean>(isMemberEnrolledInChallenge);
  const setToastPopup = useSetRecoilState(toastPopupAtom);

  const enrollChallenge = async () => {
    try {
      const res = await apiManager.post(`/challenges/${id}/enroll`);

      setIsMemberEnrolledInChallengeState(true);
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

  const cancelChallengeEnrollment = async () => {
    try {
      const res = await apiManager.post(`/challenges/${id}/cancel`);
      setIsMemberEnrolledInChallengeState(false);
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

  return (
    <>
      {isMemberEnrolledInChallengeState ? (
        // TODO: 빨간색으로 변경하기
        <Button
          color="red"
          onClick={cancelChallengeEnrollment}
          text="챌린지 참여 취소"
        />
      ) : (
        <Button onClick={enrollChallenge} text="챌린지 참여" />
      )}
    </>
  );
};

export default Enrollment;
