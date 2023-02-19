import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { LoadingProvider } from "./contexts/loading/LoadingContext";
import MyTesting from "components/MyTesting";
import Header from "components/header/Header";
function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Router />
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
