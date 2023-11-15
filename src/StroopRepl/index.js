import { useQuery, tx, transact, init, id } from "@instantdb/react";
import React, { useState } from "react";

// Init Instant
// ------------------
init({
  appId: "24b522b3-0ef8-4939-9646-658aac8716af",
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

function clearScores(users) {
  const txs = users.map((u) => tx.users[u.id].update({ highScore: 0 }));
  transact(txs);
}

function clearProfiles(users) {
  const txs = users.map((u) => tx.users[u.id].update({ handle: "" }));
  transact(txs);
}

function clearProfileName(userId) {
  if (!userId) {
    return;
  }
  transact(tx.users[userId].update({ handle: "" }));
}

function deleteUser(userId) {
  if (!userId) {
    return;
  }
  transact(tx.users[userId].delete());
}

function deleteEnts(ents) {
  const txs = ents.map((e) => tx.rooms[e.id].delete());
  transact(txs);
}

function ActionInput({ onSubmit, label, submitLabel = "Submit" }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className="flex flex-col"
    >
      <div>{label}</div>
      <div>
        <input
          type="text"
          value={value}
          className="border border-black p-2 focus:outline-none"
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          className="px-2 py-2 border border-black border-l-0 hover:cursor-pointer hover:bg-slate-200"
          type="submit"
          value={submitLabel}
        />
      </div>
    </form>
  );
}

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

function App() {
  const query = { users: {}, rooms: { users: {} }, games: {}, points: {} };
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
        <div className="space-x-4">
          <ActionButton
            onClick={() => clearScores(data["users"])}
            label="Clear Highscore"
          />
          <ActionButton
            onClick={() => clearProfiles(data["users"])}
            label="Clear Profiles"
          />
          <ActionButton
            onClick={() => deleteEnts(data["users"])}
            label="Delete Users"
          />
          <ActionButton
            onClick={() => deleteEnts(data["rooms"])}
            label="Delete Rooms"
          />
          <ActionButton
            onClick={() => deleteEnts(data["games"])}
            label="Delete Games"
          />
          <ActionButton
            onClick={() => deleteEnts(data["scores"])}
            label="Delete Scores"
          />
        </div>
        <ActionInput
          onSubmit={deleteUser}
          label="userId:"
          submitLabel="Delete User"
        />
        <ActionInput
          onSubmit={clearProfileName}
          label="userId:"
          submitLabel="Clear Profile Name"
        />
      </div>
    </div>
  );
}

export default App;
