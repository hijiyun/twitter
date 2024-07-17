import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import App from "./App.tsx";

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
