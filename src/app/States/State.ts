import { atom } from "recoil"; 

const adminLikeIcon = '/images/adminLikeIcon.svg';
const adminDiscription = 'これは管理者のお勧めの場所です。';

export const markersState = atom({
  key: 'markersState',
  default: [],
});

export const iconIdState = atom({
  key: 'iconIdState',
  default: adminLikeIcon,
});

export const descriptionsState = atom({
  key: 'descriptionsState',
  default: adminDiscription,
});

export const markerClickedState = atom({
  key: 'markerClickedState',
  default: false,
});
