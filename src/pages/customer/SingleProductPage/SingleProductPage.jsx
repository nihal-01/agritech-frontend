import React, { useEffect, useRef, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";

import "./SingleProductPage.scss";
import {
  BlankSpace,
  GridView,
  PageHero,
  Stars,
} from "../../../components/customer";
import { products } from "../../../utils/constants";
const items = products.slice(0, 5)

const product = {
  id: "002",
  name: "Beautiful Green Apple",
  stars: 3.4,
  reviews: 35,
  stock: 30,
  price: 299,
  unit: "kg",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam similique aliquid ducimus. Veniam similique optio enim magni nisi quaerat sequi quae rem, labore perferendis earum minus sapiente iusto facere corporis.",
  category: "Fruits",
  details:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam similique aliquid ducimus. Veniam similique optio enim magni nisi quaerat sequi quae rem, labore perferendis earum minus sapiente iusto facere corporis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam similique aliquid ducimus. Veniam similique optio enim magni nisi quaerat sequi quae rem, labore perferendis earum minus sapiente iusto facere corporis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam similique aliquid ducimus. Veniam similique optio enim magni nisi quaerat sequi quae rem, labore perferendis earum minus sapiente iusto facere corporis.",
  images: [
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/30-2.png",
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/76.png",
    "https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/4.jpg",
    "https://demo2wpopal.b-cdn.net/ecolive/wp-content/uploads/2021/10/36.png",
  ],
};

function SingleProductPage() {
  const [data, setData] = useState({});
  const [itemCount, setItemCount] = useState(1);

  const imgs = useRef(null);

  const handleClick = (index) => {
    imgs.current.style.transform = `translateX(-${index * 100}%)`;
  };

  const increment = () => {
    setItemCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (itemCount > 1) {
      setItemCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <PageHero title={data.title} product={true} />
      <BlankSpace />
      <div className="singleProductPage__wrapper">
        <div className="singleProductPage">
          <div className="singleProductPage__images">
            <div className="singleProductPage__images__thumbnail">
              <div className="singleProductPage__thumbnail__wrapper" ref={imgs}>
                {product.images.map((img, index) => {
                  return <img src={img} key={index} alt="" />;
                })}
              </div>
            </div>
            <div className="singleProductPage__images__lists">
              {product.images.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="singleProductPage__images__lists__item"
                    onClick={() => handleClick(index)}
                  >
                    <img src={img} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="singleProductPage__content">
            <span className="singleProductPage__content__stock">In Stock</span>
            <h1 className="singleProductPage__content__name">{product.name}</h1>
            <div className="singleProductPage__content__stars">
              <Stars stars={product.stars} />
              <p>({product.reviews} Customer Reviews)</p>
            </div>
            <h3 className="singleProductPage__content__price">
              ${product.price}
            </h3>
            <p className="singleProductPage__content__desc">
              {product.description}
            </p>
            <p className="singleProductPage__content__unit">
              <span>Unit:</span> {product.unit}
            </p>
            <hr />
            <div className="singleProductPage__content__addToCart">
              <div className="addToCart__unit__wrapper">
                <button
                  className="addToCart__unit__incdec__btn"
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  type="text"
                  value={itemCount}
                  className="addToCart__unit__input"
                  onChange={(e) => setItemCount(e.target.value)}
                />
                <button
                  className="addToCart__unit__incdec__btn"
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <span className="addToCart__btn">
                <HiOutlineShoppingBag />
                Add to cart
              </span>
            </div>
            <hr />
            <p className="singleProductPage__content__category">
              Category:{" "}
              <Link to={`/products?category=${product.category}`}>
                {product.category}
              </Link>
            </p>
          </div>
        </div>
        <BlankSpace />
        <GridView products={items} count={5} />
        <BlankSpace />
      </div>
    </>
  );
}

export default SingleProductPage;
