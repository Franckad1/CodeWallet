import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  setDoc,
  query,
  where
} from 'firebase/firestore'
import { db } from '../Config/FirebaseConifg'

export default {
  async addData(data, path) {
    try {
      const docRef = await addDoc(collection(db, path), data)
      console.log('Document written with ID: ', docRef.id)
      return docRef.id
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  },

  async getAllData(path) {
    const querySnapshot = await getDocs(collection(db, path))
    // const fragmentLists = {};
    // querySnapshot.docs.forEach((doc) => (fragmentLists[doc.id] = doc.data()));
    // console.log(fragmentLists);
    const list = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data()
      }
    })
    return list
  },
  async setData(data, path, id) {
    const fragmentRef = doc(db, path, id)
    await updateDoc(fragmentRef, data)
  },
  async deleteData(path, id) {
    await deleteDoc(doc(db, path, id))
  },
  async fetchByAnyTags(tagList) {
    const q = query(collection(db, 'fragments'), where('tags', 'array-contains-any', tagList))

    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },
  async updateData(data, path, id) {
    const fragmentRef = doc(db, path, id)
    try {
      await setDoc(fragmentRef, data, { merge: true })
      console.log('Document updated with ID: ', id)
    } catch (e) {
      console.error('Error updating document: ', e)
    }
  }
}
