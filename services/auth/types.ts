import firebase from 'firebase';

export type User = Pick<firebase.User, 'uid' | 'displayName' | 'photoURL'>;

export type Auth = {
  user: User | null;
  loading: boolean;
  signinWithGoogle: () => void;
  signout: () => void;
};
