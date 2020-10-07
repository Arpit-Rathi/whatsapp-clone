import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyCFQglHbAC3LSlSiYxtNea_fK4azFy8Lks",
    authDomain: "whatsapp-clone-4c608.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-4c608.firebaseio.com",
    projectId: "whatsapp-clone-4c608",
    storageBucket: "whatsapp-clone-4c608.appspot.com",
    messagingSenderId: "616044639818",
    appId: "1:616044639818:web:5dc6f2d796a070e3f058b3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;