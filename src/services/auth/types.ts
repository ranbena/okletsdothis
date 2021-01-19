import firebase from 'firebase';

export type Auth = {
  user: firebase.User | null;
  loading: boolean;
  signinWithGoogle: () => Promise<void>;
  signout: () => void;
};
