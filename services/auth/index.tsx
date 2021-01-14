import { FC, useState, useEffect, useContext, createContext } from 'react';

import firebase from 'services/firebase';
import { Auth } from './types';

const authContext = createContext<Auth | null>(null);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth(): Auth {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(false);

  const signinWithGoogle = () => {
    setLoading(true);

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar.events');

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential as firebase.auth.OAuthCredential;
        window.localStorage.setItem('token', credential?.accessToken ?? '');
        setUser(result.user);
      })
      .finally(() => setLoading(false));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => setUser(null));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(setUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  };
}
