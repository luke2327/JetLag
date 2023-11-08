import { atom } from 'recoil';

export interface Setting {
  theme: 'light' | 'dark';
}
export const settingState = atom<Setting>({
  key: 'setting',
  default: {
    theme: 'light',
  },
});
