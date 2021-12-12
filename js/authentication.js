const firebaseConfig = {
  apiKey: "AIzaSyCf0A3SvkqUO6P3yL4GGewcM0H-R3vPVUU",
  authDomain: "fairywingbling.firebaseapp.com",
  databaseURL: "https://fairywingbling-default-rtdb.firebaseio.com",
  projectId: "fairywingbling",
  storageBucket: "fairywingbling.appspot.com",
  messagingSenderId: "571618737446",
  appId: "1:571618737446:web:36c37e1da5978d053e15e7",
  measurementId: "${config.measurementId}",
};

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById("quickstart-sign-in").disabled = false;
      });
  }
  document.getElementById("quickstart-sign-in").disabled = true;
}

function handleSignUp() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email.length < 4) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function initApp() {
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("quickstart-verify-email").disabled = true;
    if (user) {
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed in";
      document.getElementById("page-status").textContent =
        "This is the Private Page";
      document.getElementById("quickstart-sign-in").textContent = "Sign out";
      document.getElementById("quickstart-account-details").textContent =
        JSON.stringify(user, null, "  ");
      if (!emailVerified) {
        document.getElementById("quickstart-verify-email").disabled = false;
      }
    } else {
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed out";
      document.getElementById("quickstart-sign-in").textContent = "Sign in";
      document.getElementById("page-status").textContent =
        "This is the Public Page";
      document.getElementById("quickstart-account-details").textContent =
        "null";
    }
    document.getElementById("quickstart-sign-in").disabled = false;
  });
  document
    .getElementById("quickstart-sign-in")
    .addEventListener("click", toggleSignIn, false);
  document
    .getElementById("quickstart-sign-in")
    .addEventListener("click", toggleSignIn, false);
  document
    .getElementById("quickstart-sign-up")
    .addEventListener("click", handleSignUp, false);
}

window.onload = function () {
  initApp();
};
