import cuid from "cuid";
import firebase from "../config/firebase";

const db = firebase.firestore();

//firestoreから取得するデータ型を決める
export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  //日付(timestampをJSに変換)
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}

//eventsコレクションへDB接続
export function listenToEventsFromFirestore() {
  return db.collection("events").orderBy("date");
}

//eventsコレクションへDB接続(idバージョン)
export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

//firestore作成関数
export function addEventToFirestore(event) {
  return db.collection("events").add({
    ...event,
    hostedBy: "Diana",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: "Diana",
      photoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    }),
  });
}

//firestore更新関数
export function updateEventInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

//firestore削除関数
export function deleteEventInFirestore(eventId) {
  return db.collection("events").doc(eventId).delete();
}

//イベントのキャンセル
export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}
