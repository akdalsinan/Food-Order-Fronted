import { configureStore } from "@reduxjs/toolkit";

import foodReducer from "../reducer/foodReducer";
import userReducer from "../reducer/userReducer";
import tokenBoolean from "../reducer/tokenBoolean";
import userToken from "../reducer/userToken";

import basketReducer from "../reducer/basket";

export default configureStore({
  reducer: {
    foods: foodReducer,
    users: userReducer,
    tokenBool: tokenBoolean,
    userToken: userToken,
    basket: basketReducer,
  },
});
