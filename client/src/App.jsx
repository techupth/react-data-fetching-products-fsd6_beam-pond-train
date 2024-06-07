import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [productData, setProductData] = useState([]);

  const getData = async () => {
    const result = await axios.get("http://localhost:4001/products");
    // console.log(result.data.data);

    setProductData(result.data.data);
  };

  const deleteProduct = async (index) => {
    await axios.delete(`http://localhost:4001/products/${index}`)

    
  }

  const removePorduct = (index) => {
    const newProductData = [...productData]
    newProductData.splice(index,1)
    setProductData(newProductData)
  }
  

  useEffect(() => {
    getData();
    deleteProduct()
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productData.map((product, index) => {
          return (<div className="product" key={index}>
            <div className="product-preview">
              <img
                src={product.image}
                alt="some product"
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price}Baht</h2>
              <p>Product description:{product.description}</p>
            </div>

            <button className="delete-button" onClick={() => {
              deleteProduct(product.id)
              removePorduct(index)
            }}>x</button>
          </div>
          )
        })}
          
        
          
            
         
      </div>
    </div>
  );
}

export default App;
