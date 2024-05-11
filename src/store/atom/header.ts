import {atom} from "recoil";

export const headerAtom = atom({
  key: 'headerAtom',
  default: {
    title: '',
    maxStep: 0,
    nowStep: 0
  }
})
