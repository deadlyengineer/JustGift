import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: 'justgift-2e112',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
