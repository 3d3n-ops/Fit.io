// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2RXfYLIfUqx8NwF0bBvefbHMzDICGkHM",
  authDomain: "fit-io-d9cac.firebaseapp.com",
  projectId: "fit-io-d9cac",
  storageBucket: "fit-io-d9cac.appspot.com",
  messagingSenderId: "199726667875",
  appId: "1:199726667875:web:2b54602b0f698c44d38056",
  measurementId: "G-4JW0Y4XBB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const admin = require('firebase-admin');
const serviceAccount = require('public\fit-io-d9cac-firebase-adminsdk-2nyzn-dc23b8108b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'pages\server.js'); // Adjust the file path as necessary
  const fileContents = fs.readFileSync(filePath, 'utf8');

  res.status(200).json({ data: fileContents });
}

