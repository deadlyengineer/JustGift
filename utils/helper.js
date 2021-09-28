export function getStringFromDate(date) {
    if(date == null || date == '')
        return '';

    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();
    
    return [
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        yyyy
    ].join('/');
}

export function getRecipientList(contactList) {
    let nameList = [];
    contactList.forEach(contact => {
        nameList.push(contact.first_name + ' ' + contact.last_name);
    });
    return nameList;
}

export function getCurrentRecipient(current) {
    if(current == null)
        return '';
    return current.first_name + ' ' + current.last_name;
}

export function getOccasionFromDate(value) {
    if(value == null || value == '')
        return '';
    
    const date = new Date(value);
    const monthText = ['', 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    
    return monthText[mm] + ' ' + (dd == 1 ? '1st' : dd == 2 ? '2nd' : dd == 3 ? '3rd' : dd + 'th');
}
