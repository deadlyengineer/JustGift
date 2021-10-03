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

export async function formatDB() {
    const result = FileSystem.writeAsStringAsync(fileDir, '').then(() => {
        //console.log('DB format success');
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
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

export async function updateLocalContact(origin, target) {
    const result = FileSystem.readAsStringAsync(fileDir).then(res => {
        let contacts = JSON.parse(res);
        const idx = contacts.data.findIndex(element => element.first_name == origin.first_name && element.last_name == origin.last_name);
        if(idx > -1) {
            contacts.data[idx].avatar = target.avatar;
            contacts.data[idx].first_name = target.first_name;
            contacts.data[idx].last_name = target.last_name;
            contacts.data[idx].occasion = target.occasion;
            contacts.data[idx].date = target.date;

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

export async function deleteLocalContact(target) {
    const result = FileSystem.readAsStringAsync(fileDir).then(res => {
        let contacts = JSON.parse(res);
        const idx = contacts.data.findIndex(element => element.first_name == target.first_name && element.last_name == target.last_name);
        if(idx > -1) {
            contacts.data.splice(idx, 1);
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

export async function addLocalFavorite(recipient, target) {
    const result = FileSystem.readAsStringAsync(fileDir).then(res => {
        let contacts = JSON.parse(res);
        const idx = contacts.data.findIndex(element => element.first_name == recipient.first_name && element.last_name == recipient.last_name);
        if(idx > -1) {
            if(!contacts.data[idx].favorites.includes(target)) {
                contacts.data[idx].favorites.push(target);
                const writeResult = FileSystem.writeAsStringAsync(fileDir, JSON.stringify(contacts)).then(() => {
                    //console.log('write success');
                    return true;
                }).catch(err => {
                    console.log(err);
                    return false;
                });

                return writeResult;
            } else {
                //console.log('already exist');
                return false;
            }
        }
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function deleteLocalFavorite(recipient, target) {
    const result = FileSystem.readAsStringAsync(fileDir).then(res => {
        let contacts = JSON.parse(res);
        const idx = contacts.data.findIndex(element => element.first_name == recipient.first_name && element.last_name == recipient.last_name);
        if(idx > -1) {
            const pos = contacts.data[idx].favorites.findIndex(element => element == target);
            if(pos > -1) {
                contacts.data[idx].favorites.splice(pos, 1);
                const writeResult = FileSystem.writeAsStringAsync(fileDir, JSON.stringify(contacts)).then(() => {
                    //console.log('write success');
                    return true;
                }).catch(err => {
                    console.log(err);
                    return false;
                });

                return writeResult;
            }
        }
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}
