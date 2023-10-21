import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mernauth-97fd7.firebaseapp.com',
  projectId: 'mernauth-97fd7',
  storageBucket: 'mernauth-97fd7.appspot.com',
  messagingSenderId: '483615646446',
  appId: '1:483615646446:web:9f1990dc94f1608d6749ff',
}

export const app = initializeApp(firebaseConfig)
