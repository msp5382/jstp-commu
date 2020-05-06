import firebase from "firebase";
const db = firebase.firestore();

export const getRealtimeData = (onChange, uid) => {
  let userRef = db.collection("users").doc(uid);
  userRef.onSnapshot(function (doc) {
    let data = doc.data();
    onChange(data);
  });
};

export const refreshData = async () => {
  let userLoggedInData = firebase.auth().currentUser;
  let userRef = db.collection("users").doc(userLoggedInData.uid);
  try {
    const res = await userRef.set(
      {
        realName: userLoggedInData.displayName,
        photo: userLoggedInData.photoURL,
      },
      { merge: true }
    );
    console.log(res);
    return;
  } catch (err) {
    console.log(err);
  }
};

export const getAdminData = async (onChange) => {
  db.collection("users").onSnapshot(function (querySnapshot) {
    //let data = doc.data();
    var user = [];
    querySnapshot.forEach(function (doc) {
      user.push(doc.data());
    });

    onChange(user);
  });
};
