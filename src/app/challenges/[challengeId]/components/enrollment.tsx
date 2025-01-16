import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";

import apiManager from "@/api/apiManager";
import Button from "@/app/components/button";
import { toastPopupAtom } from "@/hooks/atoms";
import { useRouter } from "next/navigation";
import { getId } from "@/libs/jwt";

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
  const router = useRouter();
  const [myId, setMyId] = useState<string | null | undefined>();

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

  const deleteChallenge = async () => {
    try {
      const res = await apiManager.delete(`/challenges/${id}`);
      setToastPopup({
        message: res.data.message,
        top: false,
        success: true,
      });
      setIsMemberEnrolledInChallengeState(false);
      router.push(`/${myId}/challenge`);
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
      router.push(`/${myId}/challenge`);
    } catch (error) {
      setToastPopup({
        // @ts-ignore
        message: error.data.message,
        top: false,
        success: false,
      });
    }
  };

  useEffect(() => {
    setMyId(getId());
  }, []);
  if (isHost) {
    return (
      <>
        <Button color="red" onClick={deleteChallenge} text="챌린지 삭제" />
      </>
    );
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
