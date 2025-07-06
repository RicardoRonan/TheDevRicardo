import { db } from '../src/firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function cleanupDuplicates() {
  // Helper to clean up a collection by a unique field
  async function cleanupCollection(collectionName, uniqueField) {
    const snapshot = await getDocs(collection(db, collectionName));
    const docsByField = {};
    const duplicates = [];

    snapshot.forEach((document) => {
      const data = document.data();
      const value = data[uniqueField];
      if (!value) return;
      if (!docsByField[value]) {
        docsByField[value] = [document.id];
      } else {
        docsByField[value].push(document.id);
      }
    });

    // Find duplicates (more than one doc with the same field value)
    Object.entries(docsByField).forEach(([value, ids]) => {
      if (ids.length > 1) {
        // Keep the first, delete the rest
        duplicates.push(...ids.slice(1));
      }
    });

    // Delete duplicates
    for (const id of duplicates) {
      await deleteDoc(doc(db, collectionName, id));
    }
    
    return duplicates.length;
  }

  try {
    const resourcesDeleted = await cleanupCollection('resources', 'name');
    const categoriesDeleted = await cleanupCollection('categories', 'id');
    return { resourcesDeleted, categoriesDeleted };
  } catch (error) {
    throw new Error(`Failed to cleanup duplicates: ${error.message}`);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupDuplicates().then(() => process.exit(0));
}

export { cleanupDuplicates }; 