import Firebase from 'firebase';

let firebaseConfig = {
   
        apiKey: "AIzaSyB1wxkDxROzh1WNktPyq7pHtXVKRS4trxk",
        authDomain: "traffic-c182a.firebaseapp.com",
        projectId: "traffic-c182a",
        storageBucket: "traffic-c182a.appspot.com",
        messagingSenderId: "594446440423",
        appId: "1:594446440423:web:c0f98761ecf5dbc1c1cf42",
        measurementId: "G-D9WDGB6PR0"
      
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database()
export const auth = app.auth()
export const storage = app.storage()
export const firestore = app.firestore()