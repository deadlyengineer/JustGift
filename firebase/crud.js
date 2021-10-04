import { firebase } from './config';

const db = firebase.firestore();

const priceOptions = [
    { min: 0, max: 999999 },
    { min: 0, max: 20 },
    { min: 20, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 999999 },
];

export async function getProducts(filterOption) {
    const result = db.collection('products').get().then(res => {
        let products = [];
        res.forEach(doc => {
            const docData = doc.data();
            if(filterOption.gender > 1 && filterOption.age > 8) {
                if(docData.price >= priceOptions[filterOption.price].min && docData.price < priceOptions[filterOption.price].max)
                    products.push({ ...docData, docId: doc.id });
            } else if(filterOption.gender > 1 && filterOption.age < 9) {
                if(docData.age.includes(`${filterOption.age}`) && docData.price >= priceOptions[filterOption.price].min && docData.price < priceOptions[filterOption.price].max)
                    products.push({ ...docData, docId: doc.id });
            } else if(filterOption.gender < 2 && filterOption.age > 8) {
                if(docData.gender.includes(`${filterOption.gender}`) && docData.price >= priceOptions[filterOption.price].min && docData.price < priceOptions[filterOption.price].max)
                    products.push({ ...docData, docId: doc.id });
            } else {
                if(docData.age.includes(`${filterOption.age}`) && docData.gender.includes(`${filterOption.gender}`) && docData.price >= priceOptions[filterOption.price].min && docData.price < priceOptions[filterOption.price].max)
                    products.push({ ...docData, docId: doc.id });
            }
        });
        //console.log(products);
        return products;
    }).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function getFavoriteProducts(itemList) {
    const result = db.collection('products').get().then(res => {
        let products = [];
        res.forEach(doc => {
            const docData = doc.data();
            if(itemList.includes(doc.id))
                products.push({ ...docData, docId: doc.id });
        });
        //console.log(products);
        return products;
    }).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function uploadImage(avatar, userId) {
    const response = await fetch(avatar);
    const blob = await response.blob();
    let localUri = avatar;
    let fileName = userId + '%' + localUri.split('/').pop();
    let ref = firebase.storage().ref(fileName);
    const result = ref.put(blob).then(() => {
        const url = ref.getDownloadURL().then(res => {
            return res;
        });
        return url;
    }).catch(err => {
        console.log(err);
        return null;
    });
    
    return result;
}

export async function getContacts(userId) {
    const result = db.collection('contacts').where('user_id', '==', userId).get().then(res => {
        let contacts = [];
        res.forEach(doc => {
            contacts.push(doc.data());
        });
        return contacts;
    }).catch(err => {
        console.log(err);
        return null;
    });

    return result;
}

export async function createContact(data) {
    const result = db.collection('contacts').doc().set(data).then(() => {
        //console.log('contact write success');
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function deleteContact(docId) {
    const result = db.collection('contacts').doc(docId).delete().then(() => {
        console.log('contact delete success');
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}

export async function updateContact(originId, target) {
    const result = db.collection('contacts').doc(originId).update({
        first_name: target.first_name,
        last_name: target.last_name,
        occasion: target.occasion,
        date: target.date,
    }).then(() => {
        //console.log('contact update success');
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });

    return result;
}
