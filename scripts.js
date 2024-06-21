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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('commentForm')) {
        const commentForm = document.getElementById('commentForm');
        const commentSection = document.getElementById('commentSection');
        
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const comment = document.getElementById('comment').value;

            if (name && comment) {
                db.collection('comments').add({
                    name: name,
                    comment: comment,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    displayComment(name, comment);
                    commentForm.reset();
                    showNotification('Comentario agregado con éxito', 'success');
                }).catch((error) => {
                    console.error("Error adding comment: ", error);
                    showNotification('Error al agregar comentario', 'danger');
                });
            } else {
                showNotification('Por favor, complete todos los campos', 'warning');
            }
        });

        // Load comments from Firestore
        db.collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            commentSection.innerHTML = '';
            snapshot.forEach((doc) => {
                displayComment(doc.data().name, doc.data().comment);
            });
        });
    }

    if (document.getElementById('solutionsList')) {
        loadSolutions();
    }
});

function loadSolutions() {
    db.collection('solutions').get().then((snapshot) => {
        const solutionsList = document.getElementById('solutionsList');
        solutionsList.innerHTML = '';
        snapshot.forEach((doc) => {
            displaySolution(doc.id, doc.data().title, doc.data().description, doc.data().details);
        });
    }).catch((error) => {
        console.error("Error loading solutions: ", error);
    });
}

function displaySolution(id, title, description, details) {
    const article = document.createElement('article');
    article.className = 'box';
    article.innerHTML = `
        <h3 class="title is-4">${title}</h3>
        <p>${description}</p>
        <button class="button is-link is-light" onclick="toggleSolutionDetails('${id}')">Ver más</button>
        <div id="${id}" class="solution-details" style="display: none;">
            <p>${details}</p>
        </div>
    `;
    document.getElementById('solutionsList').appendChild(article);
}

function displayComment(name, comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'box';
    commentElement.innerHTML = `
        <p><strong>${name}:</strong> ${comment}</p>
    `;
    document.getElementById('commentSection').appendChild(commentElement);
}

function toggleSolutionDetails(id) {
    const element = document.getElementById(id);
    element.style.display = element.style.display === 'none' || element.style.display === '' ? 'block' : 'none';
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification is-${type}`;
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
