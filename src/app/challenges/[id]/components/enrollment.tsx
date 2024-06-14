import { useState } from "react";

import { HttpStatusCode } from "axios";

import apiManager from "@api/apiManager";
import Button from "@app/components/button";

interface IEnrollmentProps {
  id: string;
  isEnrolledMember: boolean;
}

const Enrollment = ({ id, isEnrolledMember }: IEnrollmentProps) => {
  const [isEnrolledMemberState, setIsEnrolledMemberState] =
    useState<boolean>(isEnrolledMember);

  const enrollChallenge = async () => {
    try {
      const response = await apiManager.post(`/challenges/${id}/enroll`);
      if (response.status === HttpStatusCode.Ok) {
        console.log(response);
        console.log("챌린지 참여 성공");
        setIsEnrolledMemberState(true);
      }
    } catch (error) {
      console.error(error);
      console.error(error.response.data.message);
    }
  };

  const cancelChallengeEnrollment = async () => {
    try {
      const response = await apiManager.post(`/challenges/${id}/cancel`);
      if (response.status === HttpStatusCode.Ok) {
        console.log(response);
        console.log("챌린지 참여 취소 성공");
        setIsEnrolledMemberState(false);
      }
    } catch (error) {
      console.error(error);
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      {isEnrolledMemberState ? (
        // TODO: 빨간색으로 변경하기
        <Button onClick={cancelChallengeEnrollment} text="챌린지 참여 취소" />
      ) : (
        <Button onClick={enrollChallenge} text="챌린지 참여" />
      )}
    </>
  );
};

export default Enrollment;
