import { firebaseStorage } from '../config/firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const generateRandomText = () => {
    return (Math.random() + 1).toString(36).substring(7);
}

export const uploadFileOnFirebase = (image) => {
    console.log("The Image name is : " + image.name)
    console.log(generateRandomText())
    const uploadTask = ref(firebaseStorage, `images/${generateRandomText() + '-' + image.name}`)
    return uploadBytes(uploadTask, image)
}


export const getImageUrl = async (imagePath) => {
    try {
        return await new Promise((resolve) => {
            getDownloadURL(ref(firebaseStorage, imagePath)).then((downloadUrl) => {
                resolve(downloadUrl)
            });
        })
    } catch (error) {
        console.error('Error getting download URL:', error);
        return null;
    }
};
