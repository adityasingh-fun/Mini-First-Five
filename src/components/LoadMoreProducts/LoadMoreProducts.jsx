import React, { useEffect, useState } from "react";
import "./LoadMoreProducts.css";

const LoadMoreProducts = () => {
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${(count * 20)}`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch! Please try again");
      }
      const getData = await response.json();
      if(getData && getData.products && getData.products.length){
        if(count > 0){
            setProducts([...products,...getData.products]);
        }
        else{
            setProducts(getData.products)
        }
      }
      setloading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [count]);
  return (
    <div className="load-wrapper">
      <h1>Load More</h1>
      <div className="load-sub-wrapper">
        {products && products.length
          ? products.map((item, index) => {
              return (
                <div className="load-items" key={index}>
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              );
            })
          : null}
      </div>
      <button onClick={()=>setCount(count+1)}>Load more Products</button>
    </div>
  );
};

export default LoadMoreProducts;
