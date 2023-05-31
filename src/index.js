import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import { store } from "./store/store";

import Home from "./routes/home/home.component";
import ErrorPage from "./routes/error/error.component";
import Contact from "./routes/contact/contact.component";
import Portfolio from "./routes/portfolio/portfolio.component";
import Resume from "./routes/resume/resume.component";
import About from "./routes/about/about.component";
import Compose from "./routes/compose/compose.component";
import EditPortfolio from "./routes/edit-portfolio/edit-portfolio.component";
import Login from "./routes/login/login.component";

import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "compose",
        element: <Compose />,
      },
      {
        path: "edit-portfolio",
        element: <EditPortfolio />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
