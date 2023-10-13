import { useQuery, tx, transact, init, id } from "@instantdb/react";
import React, { useState } from "react";

// Instant init
// ------------------
const APP_ID = "24b522b3-0ef8-4939-9646-658aac8716af";

init({
  appId: APP_ID,
  websocketURI: "wss://api.instantdb.com/runtime/session",
});

function clearScores(users) {
  const txs = users.map((u) => tx.users[u.id].update({ highScore: 0 }));
  transact(txs);
}

function deleteUser(userId) {
  if (!userId) {
    return;
  }
  transact(tx.users[userId].delete());
}

function ActionInput({ onSubmit, label, submitLabel = "Submit" }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue("");
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
  const query = { users: {} };
  const { isLoading, error, data } = useQuery(query);
  if (isLoading) return <div>...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-wrap p-4">
      <div className="w-1/2">
        <div>
          <div className="text-xl my-2">Query:</div>
          <pre className="bg-slate-200 p-2 overflow-visible">
            {JSON.stringify(query, null, 2)}
          </pre>
        </div>
        <div>
          <div className="text-xl my-2">Results:</div>
          <pre className="bg-slate-200 p-2">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
      <div className="h-full border px-2" />
      <div>
        <div>
          <div className="text-xl my-2">Actions:</div>
          <ActionButton
            onClick={() => clearScores(data["users"])}
            label="Clear Highscore"
          />
          <ActionInput
            onSubmit={deleteUser}
            label="userId:"
            submitLabel="Delete User"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
