import { atom } from "jotai";
import type { Resource } from "./types";

export const downloadAlertAtom = atom(false);
export const shareDialogAtom = atom(false);

export const resourceAtom = atom<Resource>();
