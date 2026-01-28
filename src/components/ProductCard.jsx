import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        padding: "15px",
        textAlign: "center",
      }}
    >
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "14px",
          marginBottom: "15px",
        }}
      />

      {/* TITLE */}
      <h3
        style={{
          fontSize: "1.2rem",
          marginBottom: "8px",
          color: "#333",
          fontFamily: "serif",
        }}
      >
        {product.name}
      </h3>

      {/* DESCRIPTION */}
      <p
        style={{
          fontSize: "0.95rem",
          color: "#666",
          marginBottom: "10px",
        }}
      >
        {product.description}
      </p>

      {/* PRICE */}
      <p
        style={{
          fontSize: "1.3rem",
          color: "#ff69b4",
          fontWeight: "bold",
          marginBottom: "8px",
        }}
      >
        ${product.price.toFixed(2)}
      </p>

      {/* RATING */}
      <p
        style={{
          fontSize: "0.95rem",
          color: "#ff69b4",
          marginBottom: "14px",
        }}
      >
        {product.rating || 4.5} ⭐ ({product.reviews || 0} reviews)
      </p>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            flex: 1,
            padding: "10px",
            background: "#ff69b4",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>

        <button
          style={{
            flex: 1,
            padding: "10px",
            background: "#d81b60",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
