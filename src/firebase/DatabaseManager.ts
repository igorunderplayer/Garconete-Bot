import { FirebaseApp } from 'firebase/app'
import {
  CollectionReference,
  Firestore,
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

import User from '../models/User'

export default class DatabaseManager {
  app: FirebaseApp
  firestore: Firestore

  usersRef: CollectionReference

  constructor (app: FirebaseApp) {
    this.app = app
    this.firestore = getFirestore(app)

    this.usersRef = collection(this.firestore, 'users')
  }

  async getUser (userId: string) {
    const ref = doc(this.firestore, 'users', userId)
    const docSnap = await getDoc(ref)

    if (docSnap.exists()) {
      return new User(docSnap.data())
    }
  }

  async createUser (user: User) {
    const ref = doc(this.firestore, 'users', user.id)
    return await setDoc(ref, { ...user })
  }

  async deleteUser () {}

  async updateUser (user: User | any) {
    const ref = doc(this.firestore, 'users', user.id)
    return await setDoc(ref, { ...user }, { merge: true })
  }
}
