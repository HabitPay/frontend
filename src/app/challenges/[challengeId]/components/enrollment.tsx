import { useState } from "react";

import { HttpStatusCode } from "axios";

import apiManager from "@/api/apiManager";
import Button from "@/app/components/button";
import { useSetRecoilState } from "recoil";
import { toastPopupAtom } from "@/hooks/atoms";

interface IEnrollmentProps {
  id: string;
  isMemberEnrolledInChallenge: boolean;
  isHost: boolean;
}

const Enrollment = ({
  id,
  isMemberEnrolledInChallenge,
  isHost,
}: IEnrollmentProps) => {
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

  if (isHost) {
    return <></>;
  }

  return (
    <>
      {isMemberEnrolledInChallengeState ? (
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
