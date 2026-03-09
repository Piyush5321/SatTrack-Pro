import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, firebaseInitError } from "../firebase/config";

function requireDb() {
  if (!db) {
    throw new Error(firebaseInitError || "Firebase Firestore is not configured.");
  }
  return db;
}

export function listenToSatellites(callback) {
  if (!db) {
    callback([]);
    return () => {};
  }
  const satellitesRef = collection(db, "satellites");
  const q = query(satellitesRef, orderBy("name", "asc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    callback(data);
  });
}

export function createSatellite(payload) {
  const currentDb = requireDb();
  const satellitesRef = collection(currentDb, "satellites");
  return addDoc(satellitesRef, payload);
}

export function updateSatellite(id, payload) {
  const currentDb = requireDb();
  return updateDoc(doc(currentDb, "satellites", id), payload);
}

export function deleteSatellite(id) {
  const currentDb = requireDb();
  return deleteDoc(doc(currentDb, "satellites", id));
}
