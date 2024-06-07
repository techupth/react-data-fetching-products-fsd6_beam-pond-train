import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const fetchData = await axios.get("http://localhost:4001/products");
      setInfo(fetchData.data.data);
    } catch {
      console.log("error", error);
    }
  };

  const handleRemove = async (index, id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      let newArray = info.filter((item) => {
        return item.id != id;
      });
      setInfo(newArray);
    } catch {
      console.log("error", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">products</h1>
      </div>
      {info.map((item, index) => {
        return (
          <div key={item.id} className="product-list">
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  handleRemove(index, item.id);
                  // getProduct();
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
