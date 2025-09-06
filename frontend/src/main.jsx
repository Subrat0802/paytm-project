import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Toaster} from "sonner";
import {Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./services/redux/reducer.js";

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
    <BrowserRouter> 
      <Toaster />
      <App />
    </BrowserRouter>
    </Provider>
);
