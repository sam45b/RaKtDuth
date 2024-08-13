// import { useEffect, useState, useRef } from "react"
// import { projectFirestore } from "../firebase/config"

// export const useCollection = (collection, _query, _orderBy) => {
//   const [documents, setDocuments] = useState(null)
//   const [error, setError] = useState(null)
//   const [count,setCount] = useState(0);

//   // if we don't use a ref --> infinite loop in useEffect
//   // _query is an array and is "different" on every function call
//   const query = useRef(_query).current
//   const orderBy = useRef(_orderBy).current

//   useEffect(() => {
//     let ref = projectFirestore.collection(collection)

//     if (query) {
//       ref = ref.where(...query)
//     }
//     if (orderBy) {
//       ref = ref.orderBy(...orderBy)
//     }

//     const unsubscribe = ref.onSnapshot(snapshot => {
//       let results = []
//       snapshot.docs.forEach(doc => {
//         results.push({...doc.data(), id: doc.id})
//         setCount(snapshot.size);
//       });
      
//       // update state
//       setDocuments(results)
//       setError(null)
//     }, error => {
//       console.log(error)
//       setError('could not fetch the data')
//     })

//     // unsubscribe on unmount
//     return () => unsubscribe()

//   }, [collection, query, orderBy])

//   return { documents, error ,count}
// }
import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config'; // Ensure this imports your Firestore instance

export const useCollection = (collection, query, orderBy, limitNumber) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Using refs to avoid infinite loops
  const queryRef = useRef(query).current;
  const orderByRef = useRef(orderBy).current;
  const limitNumberRef = useRef(limitNumber).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    // Apply where clause if provided
    if (queryRef && queryRef.length) {
      ref = ref.where(...queryRef);
    }
    
    // Apply order by clause
    if (orderByRef && orderByRef.length) {
      // Ensure the first field in orderBy matches the field used in inequality filter
      if (queryRef && queryRef[0] && orderByRef[0] !== queryRef[0]) {
        console.error(`The first field in orderBy (${orderByRef[0]}) must match the field in where filter (${queryRef[0]})`);
        return;
      }
      ref = ref.orderBy(...orderByRef);
    }

    // Apply limit clause if provided
    if (limitNumberRef) {
      ref = ref.limit(limitNumberRef);
    }

    const unsubscribe = ref.onSnapshot(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id });
      });

      // Update state
      setDocuments(results);
      setCount(snapshot.size);
      setError(null);
    }, error => {
      console.error(error);
      setError('Could not fetch the data');
    });

    // Unsubscribe on unmount
    return () => unsubscribe();

  }, [collection, queryRef, orderByRef, limitNumberRef]);

  return { documents, error, count };
};
