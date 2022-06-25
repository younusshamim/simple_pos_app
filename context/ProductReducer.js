import sales from "../pages/sales";

const ProductReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };

    case "ADD_PRODUCT":
      const id = new Date().getTime();
      const quantity = 1;
      const { name, price } = action.payload;
      let newProduct = { name, price, id, quantity };
      return {
        ...state,
        products: [...state.products, newProduct],
      };

    case "EDIT_PRODUCT":
      let updatedProducts = state.products.map((item) => {
        if (item.id === action.payload.editId) {
          return {
            ...item,
            name: action.payload.name,
            price: action.payload.price,
          };
        }
        return item;
      });
      return { ...state, products: updatedProducts };

    case "ADD_TO_SALE":
      let salesItem = state.products.find((product) => {
        return product.id === action.payload;
      });
      let salesArr = [...new Set([...state.sales, salesItem])];

      return {
        ...state,
        sales: salesArr,
      };

    case "REMOVE_SALE_ITEM":
      return {
        ...state,
        sales: state.sales.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT_QUANTITY":
      let incItem = state.sales.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { ...state, sales: incItem };

    case "DECREMENT_QUANTITY":
      let decItem = state.sales.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      decItem = decItem.filter((item) => item.quantity !== 0);
      return { ...state, sales: decItem };

    case "GET_TOTAL":
      let totalAmount = 0;
      let totalQuantity = 0;

      state.sales.map(
        (item) => (totalAmount = totalAmount + item.price * item.quantity)
      );
      state.sales.map(
        (item) => (totalQuantity = totalQuantity + item.quantity)
      );
      return {
        ...state,
        totalAmount: totalAmount.toFixed(2),
        totalQuantity: totalQuantity,
      };

    case "PLACE_ORDER":
      return {
        ...state,
        orders: [...state.orders, state.sales],
        sales: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

    case "GET_POPULAR":
      // let orders = state.orders.flat(Infinity);
      // console.log(orders);

      console.log(state.orders);

    default:
      return state;
  }
};

export default ProductReducer;
