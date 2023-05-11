// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref as firebaseRef, getDownloadURL, uploadBytes } from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3AM4Ax1e4AAFO-wezUel98pauf5P_8vs",
    authDomain: "realine-25d82.firebaseapp.com",
    projectId: "realine-25d82",
    storageBucket: "realine-25d82.appspot.com",
    messagingSenderId: "646378520241",
    appId: "1:646378520241:web:abdbaa02765c96b7452c90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage()

export const sendFile = async (fileName: string, data: Buffer) => {
    const pathReference = firebaseRef(storage, 'files/' + fileName)
    return await uploadBytes(pathReference, new Uint8Array(data))
}

export const sendImage = async (fileName: string, data: Buffer) => {
    const pathReference = firebaseRef(storage, 'images/' + fileName)
    return await uploadBytes(pathReference, new Uint8Array(data))
}

export const getFileURL = async (fileName: string) => {
    const pathReference = firebaseRef(storage, 'files/' + fileName)
    return await getDownloadURL(pathReference)
}

export const getImageURL = async (fileName: string) => {
    const pathReference = firebaseRef(storage, 'images/' + fileName)
    return await getDownloadURL(pathReference)
}
