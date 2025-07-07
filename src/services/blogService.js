import { db } from '../firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';

const BLOGS_COLLECTION = 'blogs';

export const blogService = {
  // Get all blogs (ordered by date desc)
  async getAllBlogs() {
    const q = query(collection(db, BLOGS_COLLECTION), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get a single blog by ID
  async getBlogById(id) {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Blog not found');
    }
  },

  // Add a new blog
  async addBlog(blogData) {
    const docRef = await addDoc(collection(db, BLOGS_COLLECTION), blogData);
    return { id: docRef.id, ...blogData };
  },

  // Update a blog
  async updateBlog(id, blogData) {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    await updateDoc(docRef, blogData);
    return { id, ...blogData };
  },

  // Delete a blog
  async deleteBlog(id) {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  }
}; 