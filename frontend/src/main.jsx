import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeWrapper from "./Theme";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";

// Keeping AuthContext as user requested
import { AuthProvider } from "./context/AuthContext"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <ThemeWrapper>
            <App />
          </ThemeWrapper>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
