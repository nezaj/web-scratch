import React, { useEffect, useState } from 'react';
import jsonBooks from "./books.json"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

// Init Firebase
// ------------------
const firebaseConfig = {
  apiKey: "AIzaSyAlIuSLlzc6RJd-8bWd6bhoCTdBXB5kmo8",
  authDomain: "booky-74bfa.firebaseapp.com",
  databaseURL: "https://booky-74bfa-default-rtdb.firebaseio.com",
  projectId: "booky-74bfa",
  storageBucket: "booky-74bfa.appspot.com",
  messagingSenderId: "49622177975",
  appId: "1:49622177975:web:6bec028c062b6704021532"
};

const app = initializeApp(firebaseConfig);

// Actions
// ------------------
function insertBook(bookData) {
  const db = getDatabase(app);
  const booksRef = ref(db, 'books');

  push(booksRef, bookData)
    .then(() => {
      console.log("Book inserted successfully");
    })
    .catch((error) => {
      console.error("Error inserting book:", error);
    });
}

function deleteAllBooks() {
  const db = getDatabase(app);
  const booksRef = ref(db, 'books');

  remove(booksRef)
    .then(() => {
      console.log("All books deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting books:", error);
    });
}

function loadBooks(books) {
  books.map(b => insertBook(b));
}

// Components
// ------------------
function ActionButton({ onClick, label, className = "" }) {
  return (
    <div
      className={`my-2 px-4 py-4 border border-black hover:cursor-pointer hover:bg-slate-200 inline-flex ${className}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

// App
// ------------------
function App() {
  const [books, setBooks] = useState({});

  useEffect(() => {
    const db = getDatabase(app);
    const booksRef = ref(db, 'books');

    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.val() : {};
      setBooks(data);
    }, {
      onlyOnce: false
    });

    // Detach listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="text-xl my-2">Actions:</div>
      <div className="space-x-4">
        <ActionButton
          onClick={() => loadBooks(jsonBooks)}
          label="Load Books"
        />
        <ActionButton
          onClick={() => deleteAllBooks()}
          label="Delete Books"
        />
      </div>
      <h2>Books List</h2>
      <div>
        {Object.entries(books).map(([key, book]) => (
          <p key={key}>
            {book.title} - {book.author}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;

