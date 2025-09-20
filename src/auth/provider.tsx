'use client';
import { useState, useEffect, type ReactNode } from 'react';
import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from './context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Create user document in Firestore if it doesn't exist
        const userRef = doc(db, 'users', firebaseUser.uid);
        await setDoc(userRef, { 
          uid: firebaseUser.uid,
          createdAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
        }, { merge: true });
        setLoading(false);
      } else {
        // Anonymous sign-in is not enabled in your Firebase project.
        // To fix this, go to the Firebase console -> Authentication -> Sign-in method and enable Anonymous.
        // For now, we will just set the user to null and stop loading.
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
