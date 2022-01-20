import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyD3aVkirWriQr16aAMcjPO4gpA6sNob28c',
    authDomain: 'agritech-1ef86.firebaseapp.com',
    projectId: 'agritech-1ef86',
    storageBucket: 'agritech-1ef86.appspot.com',
    messagingSenderId: '861306536127',
    appId: '1:861306536127:web:a0ea3a7d771c4dc902460a',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
