import { useQuery, tx, transact, init, id } from "@instantdb/react";
import React, { useState } from "react";
import booksData from "./books.json"

// Init Instant
// ------------------
init({
  appId: "e8a4ab79-fce6-4372-bf04-c3ba7ad98d33",
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

// Actions
// ------------------
function loadBooks() {
  const txs = booksData.map((e) => tx.books[id()].update({ ...e }));
  transact(txs);
}

function deleteEnts(ents) {
  const txs = ents.map((e) => tx.rooms[e.id].delete());
  transact(txs);
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
  const query = { users: {}, books: {} };
  const { isLoading, error, data } = useQuery(query);
  if (isLoading) return <div>...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap p-4">
      <div className="w-full lg:w-2/3">
        <div>
          <div className="text-xl my-2">Query:</div>
          <pre className="bg-slate-200 p-2 overflow-visible flex-wrap">
            {JSON.stringify(query, null, 2)}
          </pre>
        </div>
        <div>
          <div className="text-xl my-2">Results:</div>
          <pre className="bg-slate-200 p-2 flex-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
      <div className="lg:w-1/3 px-4">
        <div className="text-xl my-2">Actions:</div>
        <div>
          <ActionButton
            onClick={() => loadBooks(data["books"])}
            label="Load Books"
          />
          <ActionButton
            onClick={() => deleteEnts(data["books"])}
            label="Delete Books"
          />
        </div>
      </div>
    </div>
  );
}

export default App;

