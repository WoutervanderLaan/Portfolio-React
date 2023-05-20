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
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACOG8zW6LT4sWP9noCuOTlynYewWBV74M",
  authDomain: "art-portfolio-3122b.firebaseapp.com",
  projectId: "art-portfolio-3122b",
  storageBucket: "art-portfolio-3122b.appspot.com",
  messagingSenderId: "1055459564948",
  appId: "1:1055459564948:web:0ddaf8b4a4c5f8c8444381",
  measurementId: "G-NXGRPWEN5C",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

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
  if (!updatedText) return;
  try {
    await setDoc(doc(db, "aboutItems", "LCDrbefq5lIK9FzDSh2e"), {
      name: "aboutText",
      text: updatedText,
    });
    return `Succesfully updated text`;
  } catch (error) {
    console.log(error);
  }
};

export const addResumeDoc = async (inputFields) => {
  if (!inputFields) return;
  const { kind, startDate, endDate, name } = inputFields;

  try {
    const docRef = await addDoc(collection(db, "resumeItems"), {
      kind,
      startDate,
      endDate,
      name,
    });
    return `Document written with ID: ${docRef.id}`;
  } catch (error) {
    console.log(error);
  }
};

export const removeResumeDocs = async (itemsToRemove) => {
  if (!itemsToRemove) return;
  try {
    itemsToRemove.forEach(async (item) => {
      if (!item) return;
      await deleteDoc(doc(db, "resumeItems", item));
      console.log(`Document removed with id: ${item}`);
    });
  } catch (error) {
    console.log(error);
  }
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
