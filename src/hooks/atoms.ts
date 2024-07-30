import { atom } from "recoil";

export interface IToast {
  message: string;
  top: boolean;
  success: boolean;
}

export const toastPopupAtom = atom<IToast>({
  key: "toastPopup",
  default: { message: "", top: true, success: true },
});
