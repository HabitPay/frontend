import { useState } from "react";

import { HttpStatusCode } from "axios";

import apiManager from "@/api/apiManager";
import Button from "@/app/components/button";

interface IEnrollmentProps {
  id: string;
  isMemberEnrolledInChallenge: boolean;
}

const Enrollment = ({ id, isMemberEnrolledInChallenge }: IEnrollmentProps) => {
  const [
    isMemberEnrolledInChallengeState,
    setIsMemberEnrolledInChallengeState,
  ] = useState<boolean>(isMemberEnrolledInChallenge);

  const enrollChallenge = async () => {
    try {
      const response = await apiManager.post(`/challenges/${id}/enroll`);
      if (response.status === HttpStatusCode.Ok) {
        console.log(response);
        console.log("챌린지 참여 성공");
        setIsMemberEnrolledInChallengeState(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelChallengeEnrollment = async () => {
    try {
      const response = await apiManager.post(`/challenges/${id}/cancel`);
      if (response.status === HttpStatusCode.Ok) {
        console.log(response);
        console.log("챌린지 참여 취소 성공");
        setIsMemberEnrolledInChallengeState(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isMemberEnrolledInChallengeState ? (
        // TODO: 빨간색으로 변경하기
        <Button onClick={cancelChallengeEnrollment} text="챌린지 참여 취소" />
      ) : (
        <Button onClick={enrollChallenge} text="챌린지 참여" />
      )}
    </>
  );
};

export default Enrollment;
