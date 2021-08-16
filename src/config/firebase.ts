import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCmTpkp04Fo9eMlTzGN8PQe1oWbNxfRaqE',
  authDomain: 'blog-f026f.firebaseapp.com',
  projectId: 'blog-f026f',
  storageBucket: 'blog-f026f.appspot.com',
  messagingSenderId: '567722422807',
  appId: '1:567722422807:web:3ddba006812905bbb32252',
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const db = firebase;
export default db;
