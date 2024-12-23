'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlcEh2v1rNxuzqzNfdKXyP1UV3hrm7sQQ",
  authDomain: "beavs-social.firebaseapp.com",
  databaseURL: "https://beavs-social-default-rtdb.firebaseio.com",
  projectId: "beavs-social",
  storageBucket: "beavs-social.firebasestorage.app",
  messagingSenderId: "972710406163",
  appId: "1:972710406163:web:75e6f84a6b56a7566e37e6",
  measurementId: "G-EWCP2VX0W3"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AuthenticationButton: React.FC = () => {
  // const navigate = useNavigate();
  const router = useRouter();

  const handleSignUp = async () => {  
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'oregonstate.edu'
    });
  
    firebase.auth().signInWithPopup(provider)
      .then(async (result) => {
        const emailPrefix = result.user?.email?.split("@")[0];

        const response = await fetch("http://127.0.0.1:5000/api/get_user?email=" + emailPrefix, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json()

        if ("error" in json) 
          router.push(`you/account?email=${emailPrefix}`);
        else
          router.push(`you/chats/inbox`);
      })
      .catch((error) => {
        console.log("Error signing in:", error);
      })
  };

  return (
    <button
      className="bg-[#ff4e00] hover:bg-[#BA3800] text-white font-semibold my-8 py-5 px-6 rounded-full text-2xl"
      onClick={handleSignUp}
    >
      Login with ONID
    </button>
  );
};

export default AuthenticationButton;