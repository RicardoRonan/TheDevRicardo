import { populateFirestore } from './populateFirestore.js';

populateFirestore()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
  }); 