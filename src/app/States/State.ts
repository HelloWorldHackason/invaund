import { atom } from "recoil"; 

const adminLikeIcon = '/images/adminLikeIcon.svg';
const adminDescription = 'これは管理者のお勧めの場所です。';

export const adminMarkersState = atom({
  key: 'adminMarkersState',
  default: [],
});

export const iconIdState = atom({
  key: 'iconIdState',
  default: adminLikeIcon,
});

export const descriptionsState = atom({
  key: 'descriptionsState',
  default: adminDescription,
});

export const markerClickedState = atom({
  key: 'markerClickedState',
  default: false,
});

export const customerMarkersState = atom({
    key: 'customerMarkersState',
    default: [],
  });
