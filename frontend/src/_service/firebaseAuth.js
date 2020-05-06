import firebase from "./firebase";

export const loginFB = (nextAction) => {
  const FBAuth = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithRedirect(FBAuth);
  nextAction();
};

export const listenToAuthChange = async () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("logged in", user);
        resolve(user);
      } else {
        console.log("not logged in");
        resolve(false);
      }
    });
  });
};
export const receiveRedirectResult = async (goNext) => {
  console.log(firebase.auth().currentUser);
  firebase
    .auth()
    .getRedirectResult()
    .then(function (result) {
      if (result.credential) {
        var token = result.credential.accessToken;
        console.log(token);
      }
      var user = result.user;
      console.log(user);
    });
};
export const getUserAuthState = () => {
  var user = firebase.auth().currentUser;
  return user;
};

export const Logout = () => {
  return firebase.auth().signOut();
};

export const loginAdmin = async (u, p) => {
  console.log(u, p);
  firebase
    .auth()
    .signInWithEmailAndPassword(u, p)
    .catch(() => {
      alert("ระบบเราผิดพลาด หรือไม่ก็ท่านนั่นแหละที่ผิด");
    });
};

export const listenToAuthChangeAdmin = async (go) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user?.uid === "3tWQbD6oKxQDPoNsX9UyXkp7Mop2") {
      go();
      console.log("logged in", user);
    } else {
      console.log("not logged in");
    }
  });
};

export const currentUser = firebase.auth().currentUser;
