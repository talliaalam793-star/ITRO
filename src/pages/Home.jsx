import React from "react";
import Slider from "react-slick";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const sweaterProducts = products.filter((p) => p.category === "sweater");

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  // Slider settings for horizontal product scroll
  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div>
      {/* ================= BANNER ================= */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        <Slider {...bannerSettings}>
          {["b1", "b2", "b3", "b4"].map((b, i) => (
            <div key={i}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(/banners/${b}.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  aspectRatio: "3780 / 1890",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* ================= SWEATER COLLECTION ================= */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#d81b60",
            marginBottom: "40px",
          }}
        >
          Sweater Collection
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "25px",
          }}
        >
          {sweaterProducts.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= NEW ARRIVALS ================= */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#d81b60",
            marginBottom: "40px",
          }}
        >
          New Arrivals
        </h2>

        <Slider {...productSliderSettings}>
          {products.map((product) => (
            <div key={product.id} style={{ padding: "0 10px" }}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Home;
