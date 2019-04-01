import { useState, useEffect } from 'react';
import { db } from '../firebase';

export default function useCollection(path, orderBy, query = []) {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    let collection = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    if (query.length) {
      collection = collection.where(...query);
    }
    return collection.onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDocs(docs);
    });
  }, [path, orderBy, query]);

  return docs;
}
