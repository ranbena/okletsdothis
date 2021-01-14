import { FC, useState, useEffect, useContext, createContext } from 'react';

import firebase from 'services/firebase';
import { Auth, User } from './types';

const authContext = createContext<Auth | null>(null);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth(): Auth {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUserChange = (firebaseUser: firebase.User | null) => {
    if (firebaseUser) {
      const { uid, displayName, photoURL } = firebaseUser;
      const user = { uid, displayName, photoURL };
      setUser(user);
    } else {
      setUser(null);
    }
  };

  const signinWithGoogle = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(({ user }) => handleUserChange(user))
      .finally(() => setLoading(false));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUserChange(null));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUserChange);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  };
}
