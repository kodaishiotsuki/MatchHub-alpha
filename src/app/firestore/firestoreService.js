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
export function listenToEventsFromFirestore(predicate) {
  const user = firebase.auth().currentUser;
  let eventsRef = db.collection("events");
  switch (predicate.get("filter")) {
    case "engineer":
      return eventsRef.where("subTitle", "==", "エンジニア");
    case "designer":
      return eventsRef.where("subTitle", "==", "デザイナー");
    case "isHosting":
      return eventsRef.where("hostUid", "==", user.uid);
    // .where("date", ">=", predicate.get("startDate"));
    default:
      return eventsRef;
    // return eventsRef.where("date", ">=", predicate.get("startDate"));
  }
}

//eventsコレクションへDB接続(idバージョン)
export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

//firestore作成関数(eventsコレクションに参加者を追加する)
export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser;
  return db.collection("events").add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

//firestore usersコレクションに画像を保存
export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

//firestore eventsコレクションに画像を保存
export async function updateEventProfilePhoto(downloadURL) {
  const user = firebase.auth().currentUser;
  const eventDocRef = db.collection("events").doc(user.uid);
  try {
    const eventDoc = await eventDocRef.get();
    if (!eventDoc.data().companyPhotoURL) {
      await db.collection("events").doc(user.uid).update({
        companyPhotoURL: downloadURL,
      });
    }
    return await db.collection("events").doc(user.uid).add({
      companyPhotoURL: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

//ユーザーの写真を取得
export function getUserPhotos(userUid) {
  return db.collection("users").doc(userUid).collection("photos");
}

//メイン写真の設定
export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  try {
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

//firestore users,photoから画像を削除
export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}

//参加者追加（会社のメンバー追加）
export function addUserAttendance(event) {
  const user = firebase.auth().currentUser;
  return db
    .collection("events")
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

//参加者キャンセル（会社のメンバー削除）
export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser;
  try {
    //参加中のメンバーを取得
    const eventDoc = await db.collection("events").doc(event.id).get();
    return db
      .collection("events")
      .doc(event.id)
      .update({
        attendeesIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}

//おそらく使わない
export function getUserEventsQuery(activeTab, userUid) {
  let eventsRef = db.collection("events");
  switch (activeTab) {
    case 1: //past events
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .orderBy("date", "desc");
    case 2: //hosting
      return eventsRef.where("hostUid", "==", userUid).orderBy("date");
    default:
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .orderBy("date");
  }
}

//フォローボタンを押したときのアクション
export async function followUser(profile) {
  const user = firebase.auth().currentUser;
  try {
    await db
      .collection("following")
      .doc(user.uid)
      .collection("userFollowing")
      .doc(profile.id)
      .set({
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      });
    await db
      .collection("following")
      .doc(profile.id)
      .collection("userFollowers")
      .doc(user.uid)
      .set({
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        followingCount: firebase.firestore.FieldValue.increment(1),
      });
    await db
      .collection("users")
      .doc(profile.id)
      .update({
        followerCount: firebase.firestore.FieldValue.increment(1),
      });
  } catch (error) {
    throw error;
  }
}

//アンフォローボタンを押したときのアクション
export async function unFollowUser(profile) {
  const user = firebase.auth().currentUser;
  try {
    await db
      .collection("following")
      .doc(user.uid)
      .collection("userFollowing")
      .doc(profile.id)
      .delete();
    await db
      .collection("following")
      .doc(profile.id)
      .collection("userFollowers")
      .doc(user.uid)
      .delete();
    await db
      .collection("users")
      .doc(user.uid)
      .update({
        followingCount: firebase.firestore.FieldValue.increment(-1),
      });
    await db
      .collection("users")
      .doc(profile.id)
      .update({
        followerCount: firebase.firestore.FieldValue.increment(-1),
      });
  } catch (error) {
    throw error;
  }
}

//フォロワーを獲得するアクション
export function getFollowersCollection(profileId) {
  return db.collection('following').doc(profileId).collection('userFollowers')
}
//フォローした人を獲得するアクション
export function getFollowingCollection(profileId) {
  return db.collection("following").doc(profileId).collection("userFollowing");
}
