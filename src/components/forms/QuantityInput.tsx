import React from "react";

type Props = {
  minQuantity: number;
  maxQuantity: number;
  quantity: number;
  setQuantity: (value: number) => void;
};

export default function QuantityInput({ minQuantity,maxQuantity,quantity, setQuantity }: Props) {

  const increment = () => {
    if(quantity<maxQuantity)setQuantity(quantity + 1);
  }
  const decrement = () => {
    if (quantity > 1 && quantity>minQuantity) setQuantity(quantity - 1);
  };

  const decrementButtonClass = quantity <= minQuantity ? "quantity-button disabled" : "quantity-button";
  const incrementButtonClass = quantity >= maxQuantity ? "quantity-button disabled" : "quantity-button";

  return (
    <div className="input-field border" style={{ flex: 1 }}>
      <span className="frame-flex input padding s all">
        <button
          type="button"
          className={decrementButtonClass}
          onClick={decrement}
          style={{ margin: "0 10px" }}
        >
          -
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="1"
          className="text-subtitle"
          style={{ textAlign: "right" }}
        />

        <button
          type="button"
          className={incrementButtonClass}
          onClick={increment}
          style={{ margin: "0 10px" }}
        >
          +
        </button>
      </span>
    </div>
  );
}
