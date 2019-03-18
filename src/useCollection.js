import { useState, useEffect } from 'react';
import { db } from './firebase';

export default function useCollection(path, orderBy, query = []) {
  const [docs, setDocs] = useState([]);
  const [field, operator, value] = query;
  useEffect(() => {
    let collection = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    if (field) {
      collection = collection.where(field, operator, value);
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
  }, [path, orderBy, field, operator, value]);

  return docs;
}