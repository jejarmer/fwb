import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  //doc,
  //deleteDoc,
  //query,
  //where,
  //updateDoc,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getReviews(db) {
  const reviewsCol = collection(db, "reviews");
  const reviewsSnapshot = await getDocs(reviewsCol);
  const reviewsList = reviewsSnapshot.docs.map((doc) => doc.data());
  return reviewsList;
}
const reviewsList = document.querySelector("#reviews-list");
const form = document.querySelector("#add-reviews-form");

function renderReviews(dc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let review = document.createElement("span");
  let spacer = document.createElement("hr");
  li.setAttribute("data-id", dc.id);
  name.textContent = dc.data().name;
  review.textContent = dc.data().review;
  li.appendChild(name);
  li.appendChild(review);
  li.appendChild(spacer);
  reviewsList.appendChild(li);
}

const reviews = getDocs(collection(db, "reviews")).then((snapshot) => {
  snapshot.forEach((doc) => {
    renderReviews(doc);
  });
});

form.addEventListener("submit", (e) => {
  if (e == null) return;
  e.preventDefault();
  const docRef = addDoc(collection(db, "reviews"), {
    review: form.review.value,
    name: form.name.value,
  });
});
