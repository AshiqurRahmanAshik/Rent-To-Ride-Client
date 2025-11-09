import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA2GvyGF8mIpY-uJ-JGF7Tljr4Kf_xBGyo',
  authDomain: 'rent-to-ride-e182b.firebaseapp.com',
  projectId: 'rent-to-ride-e182b',
  storageBucket: 'rent-to-ride-e182b.appspot.com',
  messagingSenderId: '695216545947',
  appId: '1:695216545947:web:5a535cea2bef81c2c3663e',
};

export const app = initializeApp(firebaseConfig);
