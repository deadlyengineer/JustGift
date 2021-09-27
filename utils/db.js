import * as FileSystem from 'expo-file-system';

const fileDir = FileSystem.documentDirectory + 'justgift.db';

export async function initDB() {
    const fileInfo = await FileSystem.getInfoAsync(fileDir);
    if(!fileInfo.exists) {
        console.log('DB file does not exist');
        FileSystem.writeAsStringAsync(fileDir, '').then(() => {
            //console.log('Success');
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        });
    } else {
        return true;
    }
}
