import { useState } from "react";

const Items = () => {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");

  const addItem = () => {
    if (!desc) return;

    setItems([
      ...items,
      { id: Date.now(), description: desc, status: "Lost" }
    ]);
    setDesc("");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Lost & Found Items</h2>

      <input
        placeholder="Item description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={addItem}>Post</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.description} — {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
