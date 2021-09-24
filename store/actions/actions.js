import { CHANGE_RECIPIENT, CHANGE_USER, CHANGE_GUEST, CHANGE_NOTIFICATION_STATUS } from '../constants';

export function changeRecipient(recipient) {

    return {
        type: CHANGE_RECIPIENT,
        payload: recipient
    }
}

export function changeUser(userId) {

    return {
        type: CHANGE_USER,
        payload: userId
    }
}

export function changeNotify(status) {

    return {
        type: CHANGE_NOTIFICATION_STATUS,
        payload: status
    }
}

export function changeGuest(guestId) {

    return {
        type: CHANGE_GUEST,
        payload: guestId
    }
}
