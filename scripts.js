// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfJiBkzwaLdoSpQDHU3rCgfC4nMr58hUk",
  authDomain: "paginaweb-d1886.firebaseapp.com",
  projectId: "paginaweb-d1886",
  storageBucket: "paginaweb-d1886.appspot.com",
  messagingSenderId: "430619803153",
  appId: "1:430619803153:web:1fbada3c7fb6ca45a07bb0",
  measurementId: "G-BYJ5RVSZ92"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to add a tutorial
async function addTutorial(title, content) {
    try {
        await db.collection('tutorials').add({
            title: title,
            content: content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Tutorial added successfully!");
    } catch (error) {
        console.error("Error adding tutorial: ", error);
        alert("Failed to add tutorial: " + error.message);
    }
}

// Function to fetch tutorials
async function fetchTutorials() {
    try {
        const snapshot = await db.collection('tutorials').orderBy('timestamp', 'desc').get();
        snapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            // Append data to the UI
        });
    } catch (error) {
        console.error("Error fetching tutorials: ", error);
        alert("Failed to fetch tutorials: " + error.message);
    }
}

// Function to add a comment
async function addComment(tutorialId, comment) {
    try {
        await db.collection('tutorials').doc(tutorialId).collection('comments').add({
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Comment added successfully!");
    } catch (error) {
        console.error("Error adding comment: ", error);
        alert("Failed to add comment: " + error.message);
    }
}

// Function to fetch comments for a tutorial
async function fetchComments(tutorialId) {
    try {
        const snapshot = await db.collection('tutorials').doc(tutorialId).collection('comments').orderBy('timestamp', 'desc').get();
        snapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            // Append data to the UI
        });
    } catch (error) {
        console.error("Error fetching comments: ", error);
        alert("Failed to fetch comments: " + error.message);
    }
}
