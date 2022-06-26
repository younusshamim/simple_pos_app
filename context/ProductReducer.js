import cart from "../pages/cart";

const ProductReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "EDIT_PRODUCT":
      let updatedProduct = state.products.map((product) => {
        if (product._id === action.payload.editId) {
          return {
            ...product,
            name: action.payload.name,
            price: action.payload.price,
          };
        }
        return product;
      });
      return { ...state, products: updatedProduct };

    case "ADD_TO_CART":
      let cartItem = state.products.find((product) => {
        return product._id === action.payload;
      });
      let cartArr = [...new Set([...state.cart, cartItem])];

      return {
        ...state,
        cart: cartArr,
      };

    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };

    case "INCREMENT_QUANTITY":
      let incItem = state.cart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { ...state, cart: incItem };

    case "DECREMENT_QUANTITY":
      let decItem = state.cart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      decItem = decItem.filter((item) => item.quantity !== 0);
      return { ...state, cart: decItem };

    case "GET_TOTAL":
      let totalAmount = 0;
      let totalQuantity = 0;

      state.cart.map(
        (item) => (totalAmount = totalAmount + item.price * item.quantity)
      );
      state.cart.map((item) => (totalQuantity = totalQuantity + item.quantity));
      return {
        ...state,
        totalAmount: totalAmount.toFixed(2),
        totalQuantity: totalQuantity,
      };

    case "PLACE_ORDER":
      return {
        ...state,
        orders: [...state.orders, state.cart],
        cart: [],
        totalAmount: 0,
        totalQuantity: 0,
        alertMsg: "Order Success!",
      };

    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    case "GET_POPULAR":
    // let orders = state.orders.flat(Infinity);
    // console.log(orders);

    default:
      return state;
  }
};

export default ProductReducer;
