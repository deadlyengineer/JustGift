import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCOb1bwU-Au_HD_d57wZYv09RbEs4kNJZg',
    authDomain: 'justgift-2e112.firebaseapp.com',
    databaseURL: 'https://justgift-2e112.firebaseio.com',
    projectId: 'justgift-2e112',
    storageBucket: 'justgift-2e112.appspot.com',
    messagingSenderId: '1071101303373',
    appId: '1:1071101303373:ios:e8ada18d9d3c69ecc29a04',
    measurementId: '287397094',
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
