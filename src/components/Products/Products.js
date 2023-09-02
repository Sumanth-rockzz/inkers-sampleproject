import { useEffect, useRef, useState } from "react";
//Get Products List from the Api and display and implement search  and Add to cart functionality
const Products = () => {
  const [products, setProducts] = useState([]);
  const searchWordRef = useRef();
  const [cartItems, setCartItems] = useState([]);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const productsList = data.products.map((product) => {
          return {
            id: product.id,
            title: product.title,
            price: product.price,
          };
        });
        setProducts(productsList);
      });
  }, []);

  const searchProductsHandler = () => {
    const searchProductTitle = searchWordRef.current.value;
    console.log(searchProductTitle);

    const filtered = products.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(searchProductTitle.toLowerCase());
    });
    console.log(filtered);
    setProducts(filtered);
  };

  const cartHandler = (product) => {
    console.log(product);
    setCartItems((prev) => [...prev, product]);
  };

  const showCartHandler = () => {
    setIsShow((prev) => !prev);
    console.log(isShow);
  };

  return (
    <>
      <input type="text" name="Search" ref={searchWordRef} />
      <button onClick={searchProductsHandler}>Search</button>
      {isShow && <button onClick={showCartHandler}>hide cart</button>}
      {!isShow && <button onClick={showCartHandler}>show cart</button>}
      {isShow && (
        <>
          <h3>Cart-Items</h3>
          <ul>
            {cartItems.map((cartItem) => {
              console.log(cartItem);
              return (
                <li key={cartItem.id}>
                  {cartItem.id}-{cartItem.title}-{cartItem.price}-
                </li>
              );
            })}
          </ul>
          <br />
        </>
      )}

      <hr />
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.id}-{product.title}-{product.price}-
              <button
                onClick={() => {
                  cartHandler(product);
                }}
              >
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Products;
