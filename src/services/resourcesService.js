import { db } from '../firebase.js';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

const RESOURCES_COLLECTION = 'resources';

export const resourcesService = {
  // Get all resources
  async getAllResources() {
    try {
      const querySnapshot = await getDocs(collection(db, RESOURCES_COLLECTION));
      const resources = [];
      querySnapshot.forEach((doc) => {
        resources.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return resources;
    } catch (error) {
      throw new Error(`Failed to fetch resources: ${error.message}`);
    }
  },

  // Get resources by category
  async getResourcesByCategory(category) {
    try {
      const q = query(
        collection(db, RESOURCES_COLLECTION),
        where('category', '==', category),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);
      const resources = [];
      querySnapshot.forEach((doc) => {
        resources.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return resources;
    } catch (error) {
      throw new Error(`Failed to fetch resources by category: ${error.message}`);
    }
  },

  // Add a new resource
  async addResource(resourceData) {
    try {
      const docRef = await addDoc(collection(db, RESOURCES_COLLECTION), resourceData);
      return {
        id: docRef.id,
        ...resourceData
      };
    } catch (error) {
      throw new Error(`Failed to add resource: ${error.message}`);
    }
  },

  // Update a resource
  async updateResource(id, resourceData) {
    try {
      const docRef = doc(db, RESOURCES_COLLECTION, id);
      await updateDoc(docRef, resourceData);
      return {
        id,
        ...resourceData
      };
    } catch (error) {
      throw new Error(`Failed to update resource: ${error.message}`);
    }
  },

  // Delete a resource
  async deleteResource(id) {
    try {
      const docRef = doc(db, RESOURCES_COLLECTION, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete resource: ${error.message}`);
    }
  },

  // Get categories
  async getCategories() {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return categories;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  },

  // Add a new category
  async addCategory(categoryData) {
    try {
      const docRef = await addDoc(collection(db, 'categories'), categoryData);
      return {
        id: docRef.id,
        ...categoryData
      };
    } catch (error) {
      throw new Error(`Failed to add category: ${error.message}`);
    }
  },

  // Update a category
  async updateCategory(id, categoryData) {
    try {
      const docRef = doc(db, 'categories', id);
      await updateDoc(docRef, categoryData);
      return {
        id,
        ...categoryData
      };
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  },

  // Delete a category
  async deleteCategory(id) {
    try {
      const docRef = doc(db, 'categories', id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}; 