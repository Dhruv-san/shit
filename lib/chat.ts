import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Create a new chat message in a match's chat
export async function sendMessage(matchId: string, senderId: string, text: string) {
  return addDoc(collection(db, 'matches', matchId, 'messages'), {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });
}

// Get all messages for a match, ordered by timestamp
export async function getMessages(matchId: string) {
  const q = query(
    collection(db, 'matches', matchId, 'messages'),
    orderBy('timestamp', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
