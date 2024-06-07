import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productPost, setProductPost] = useState([]);

  const getProductPost = async () => {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result.data.data);
    setProductPost(result.data.data);
  };

  const deleteProductPost = async (productId) => {
    await axios.delete(`http://localhost:4001/products/${productId}`);
  };

  const handleRemove = (id) => {
    const newProductPost = [...productPost];
    newProductPost.splice(id, 1);
    setProductPost(newProductPost);
  };

  useEffect(() => {
    getProductPost();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productPost.map((post, id) => {
          return (
            <div className="product" key={id}>
              <div className="product-preview">
                <img
                  src={post.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {post.name}</h1>
                <h2>Product price: {post.price} Baht</h2>
                <p>Product description: {post.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  handleRemove(id);
                  deleteProductPost(post.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
