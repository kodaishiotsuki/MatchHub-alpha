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

//新規登録時のユーザー設定
export function setUserProfileData(user) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

//ユーザープロフィール
export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

//プロフィール更新(displayNameで判別)
export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}
