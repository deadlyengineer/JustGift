import { firebase } from './config';

const auth = firebase.auth();
const db = firebase.firestore();

export async function signInWithEmailAndPassword(email, pwd) {
    const result = auth.signInWithEmailAndPassword(email, pwd).then(() => {
        //console.log('sign-in success');
        return 'success';
    }).catch(err => {
        let reason = 'fail-other';
        if(err.code == 'auth/wrong-password')
            reason = 'fail-password';
        if(err.code == 'auth/invalid-email')
            reason = 'fail-email';
        if(err.code == 'auth/user-not-found')
            reason = 'fail-user';
        return reason;
    });

    return result;
}

export async function createUserWithEmailAndPassword(email, pwd) {
    const result = auth.createUserWithEmailAndPassword(email, pwd).then(res => {
        //console.log('sign-up success');
        return { status: 'success', uid: res.user.uid };
    }).catch(err => {
        let reason = 'fail-other';
        if(err.code == 'auth/invalid-email')
            reason = 'fail-invalid';
        if(err.code == 'auth/email-already-in-use')
            reason = 'fail-already';
        return { status: 'fail', reason: reason };
    });

    return result;
}
