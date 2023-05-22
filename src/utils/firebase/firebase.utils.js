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
} from "firebase/firestore";

import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
  try {
    await setDoc(doc(db, "aboutItems", "LCDrbefq5lIK9FzDSh2e"), {
      name: "aboutText",
      text: updatedText,
    });
  } catch (error) {
    console.error(`Error changing text: ${error}`);
  }
};

export const addResumeDoc = async (inputFields) => {
  if (!inputFields) return;
  const { category, startDate, endDate, name } = inputFields;
  try {
    const docRef = await addDoc(collection(db, "resumeItems"), {
      category,
      startDate,
      endDate,
      name,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
};

export const removeResumeDocs = async (itemsToRemove) => {
  if (!itemsToRemove) return;
  try {
    const promiseArray = itemsToRemove.map(async (item) => {
      if (!item) throw new Error("No item to delete");
      const itemToDelete = deleteDoc(doc(db, "resumeItems", item));
      return itemToDelete;
    });
    await Promise.all(promiseArray);
    alert(`Succesfully removed documents`);
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
