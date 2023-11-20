import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./app/store.ts";
import persistor from "./app/store.ts";
import "./index.css";
import { ConfigProvider } from "antd";
import { theme } from "./theme.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </PersistGate>
  </Provider>
);
