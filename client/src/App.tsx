import { useContext, useEffect } from "react";
import { SettingsContext } from "./app/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // for checkout route ?

import { Header } from "./components/Header";
import { Categories } from "./features/products/Categories";
import { ActiveCategory } from "./components/ActiveCategory";
import { Products } from "./features/products/Products";
import { Footer } from "./components/Footer";
// import { Counter } from "./features/counter/Counter";

import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import { useAppDispatch } from "./app/hooks";
import { fetchProducts } from "./features/products/productsSlice";

function App() {
  const { theme } = useContext(SettingsContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(fetchProducts()), 5000);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <Categories />
        <ActiveCategory />
        <Products />
        {/* <div className="App">
        <header className="App-header">
          <Counter />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div> */}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
