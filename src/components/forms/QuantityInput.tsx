import React, { useState } from "react";

export default function QuantityInput() {
  // Estado para el valor numérico
  const [quantity, setQuantity] = useState(1);

  // Función para incrementar
  const increment = () => {
    setQuantity(quantity + 1);
  };

  // Función para decrementar
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="input-field border">
      <span className="frame-flex input padding s all">
        {/* Botón para decrementar */}
        <button
          type="button"
          className="decrement-button"
          onClick={decrement}
        >
          -
        </button>

        {/* Campo de entrada para la cantidad */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="1"
          className=""
          style={{textAlign:"right"}}
        />

        {/* Botón para incrementar */}
        <button
          type="button"
          className="increment-button"
          onClick={increment}
        >
          +
        </button>

        {/* Texto que indica que es la cantidad */}
        <span className="input-type">Qty</span>
      </span>
    </div>
  );
}
