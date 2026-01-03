const ItemCard = ({ item }) => {
  return (
    <div
      className="item-card"
      style={{
        background: "white",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <div className="item-header" style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{item.name}</strong>
        <span
          className={`status ${item.status}`}
          style={{
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            background: item.status === "lost" ? "#fee2e2" : "#dcfce7",
            color: item.status === "lost" ? "#991b1b" : "#166534",
          }}
        >
          {item.status.toUpperCase()}
        </span>
      </div>
      <p className="desc">{item.description}</p>
    </div>
  );
};

export default ItemCard;
