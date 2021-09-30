import * as FileSystem from 'expo-file-system';

const fileDir = FileSystem.documentDirectory + 'justgift.db';

export async function initDB() {
    const fileInfo = await FileSystem.getInfoAsync(fileDir);
    if(!fileInfo.exists) {
        console.log('DB file does not exist');
        const result = FileSystem.writeAsStringAsync(fileDir, '').then(() => {
            //console.log('Success');
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        });
        return result;
    } else {
        return true;
    }
}

export async function getLocalContacts() {
    const result = FileSystem.readAsStringAsync(fileDir).then(res => {
        if(!res) {
            const contacts = [];
            return contacts;
        } else {
            const contacts = JSON.parse(res);
            return contacts.data;
        }
    }).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getLocalFavorites() {
    getLocalContacts().then(res => {
        let items = [];
        if(res !== null && res.length > 0) {
            
        }
    }).catch(err => {
        console.log(err);
    });
}

export async function createLocalContact(data) {
    const result = FileSystem.readAsStringAsync(fileDir).then(res => {
        if(!res) {
            const content = {
                data: [data]
            };
            const writeResult = FileSystem.writeAsStringAsync(fileDir, JSON.stringify(content)).then(() => {
                //console.log('write success');
                return true;
            }).catch(err => {
                console.log(err);
                return false;
            });
            return writeResult;
        } else {
            let content = JSON.parse(res);
            content.data.push(data);
            const writeResult = FileSystem.writeAsStringAsync(fileDir, JSON.stringify(content)).then(() => {
                //console.log('write success');
                return true;
            }).catch(err => {
                console.log(err);
                return false;
            });
            return writeResult;
        }
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function updateLocalContact(origin, data) {
    const result = FileSystem.readAsStringAsync(fileDir).then(res => {
        let contacts = JSON.parse(res);
        const idx = contacts.data.findIndex(element => element.first_name == origin.first_name && element.last_name == origin.last_name);
        if(idx > -1) {
            contacts.data[idx].avatar = data.avatar;
            contacts.data[idx].first_name = data.first_name;
            contacts.data[idx].last_name = data.last_name;
            contacts.data[idx].occasion = data.occasion;
            contacts.data[idx].date = data.date;

            const writeResult = FileSystem.writeAsStringAsync(fileDir, JSON.stringify(contacts)).then(() => {
                //console.log('write success');
                return true;
            }).catch(err => {
                console.log(err);
                return false;
            });
            
            return writeResult;
        }
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function deleteLocalContact() {
    
}

export async function getFavorites(recipient) {

}
