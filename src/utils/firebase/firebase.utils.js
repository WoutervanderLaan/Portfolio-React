import { modifyFileName, reduceFileSize } from "../formatting.utils";

import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

import {
  getFirestore,
  collection,
  query,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  where,
} from "firebase/firestore";

import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "art-portfolio-3122b.firebaseapp.com",
  projectId: "art-portfolio-3122b",
  storageBucket: "art-portfolio-3122b.appspot.com",
  messagingSenderId: "1055459564948",
  appId: "1:1055459564948:web:0ddaf8b4a4c5f8c8444381",
  measurementId: "G-NXGRPWEN5C",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

////////////////////// AUTH /////////////////////

const auth = getAuth(app);

// const adminSignUpWithEmailAndPassword = async (email, password) => {
//   try {
//     const adminRef = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return adminRef.user;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const adminLoginWithEmailAndPassword = async ({ email, password }) => {
  const adminRef = await signInWithEmailAndPassword(auth, email, password);
  return adminRef.user.uid;
};

export const adminLogOut = async () => {
  await signOut(auth);
};

////////////////////// STORAGE /////////////////////

const storage = getStorage(app);
const imageStorageRef = ref(storage, "images");

export const uploadFileToStorage = (fileArray, series) => {
  const seriesStorageRef = ref(imageStorageRef, series);
  const promiseArray = fileArray.map(async (file) => {
    const reducedFileSize = await reduceFileSize(file);
    const newFileName = modifyFileName(reducedFileSize.name);
    const imageRef = ref(seriesStorageRef, newFileName);
    return uploadBytes(imageRef, reducedFileSize);
  });
  return Promise.all(promiseArray);
};

export const fetchFileUrlFromStorage = async (fileName, series) => {
  const request = await getDownloadURL(
    ref(storage, `images/${series}/${fileName}`)
  );
  return request;
};

export const deleteImages = async (imageUrlList) => {
  if (!imageUrlList) return;

  const promiseList = imageUrlList.map((url) => {
    const imageToDeleteRef = ref(storage, url);
    return deleteObject(imageToDeleteRef);
  });
  Promise.all(promiseList);
};

////////////////////// DB /////////////////////

const db = getFirestore(app);

export const batchWriteResumeDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef);
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getAboutDoc = async () => {
  try {
    const collectionRef = collection(db, "aboutItems");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const setAboutDoc = async (updatedText) => {
  if (!updatedText) throw new Error("No input provided.");
  await setDoc(doc(db, "aboutItems", "LCDrbefq5lIK9FzDSh2e"), {
    name: "aboutText",
    text: updatedText,
  });
};

export const addResumeDoc = async (inputFields) => {
  if (!inputFields) return;
  const { category, startDate, endDate, name } = inputFields;
  const docRef = await addDoc(collection(db, "resumeItems"), {
    category,
    startDate,
    endDate,
    name,
  });
  console.log("Document written with ID: ", docRef.id);
};

export const removeResumeDocs = async (itemsToRemove) => {
  if (!itemsToRemove) return;

  const promiseArray = itemsToRemove.map(async (item) => {
    if (!item) throw new Error("No item to delete");
    const itemToDelete = deleteDoc(doc(db, "resumeItems", item));
    return itemToDelete;
  });
  await Promise.all(promiseArray);
  console.log(`Succesfully removed documents`);
};

export const getResumeDocs = async () => {
  try {
    const collectionRef = collection(db, "resumeItems");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const addPortfolioDoc = async (inputFields) => {
  if (!inputFields) return;
  const { series, titleAndYear, material, dimensions, description, image } =
    inputFields;

  try {
    const docRef = await addDoc(collection(db, "portfolioItems"), {
      series,
      titleAndYear,
      material,
      dimensions,
      description,
      image,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
};

export const getPortfolioDocs = async () => {
  try {
    const collectionRef = collection(db, "portfolioItems");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data() };
    });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const removePortfolioDocs = async (imageUrlList) => {
  if (!imageUrlList) return;

  const promiseList = imageUrlList.map(async (imageUrl) => {
    const q = query(
      collection(db, "portfolioItems"),
      where("image", "==", imageUrl)
    );

    const itemToDelete = await getDocs(q);

    return itemToDelete.forEach((item) =>
      deleteDoc(doc(db, "portfolioItems", item.id))
    );
  });

  Promise.all(promiseList);
};

export const setSeriesOrderDoc = async (seriesOrderObject) => {
  if (!seriesOrderObject) return;
  await setDoc(
    doc(db, "seriesOrder", "J2oICtHO3dhQ2wib3oXL"),
    seriesOrderObject
  );
};

export const getSeriesOrderDoc = async () => {
  try {
    const collectionRef = collection(db, "seriesOrder");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (err) {
    console.error(err);
  }
};
