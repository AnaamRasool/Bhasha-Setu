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
      } else {
        // No user, sign in anonymously
        try {
          const { user: anonUser } = await signInAnonymously(auth);
           const userRef = doc(db, 'users', anonUser.uid);
           await setDoc(userRef, { 
            uid: anonUser.uid,
            createdAt: serverTimestamp(),
            lastActivity: serverTimestamp(),
           }, { merge: true });
          setUser(anonUser);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
