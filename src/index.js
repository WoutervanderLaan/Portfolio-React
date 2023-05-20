import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import ResumeProvider from "./contexts/resume/resume.context";

import Home from "./routes/home/home.component";
import ErrorPage from "./routes/error/error.component";
import Contact from "./routes/contact/contact.component";
import Portfolio from "./routes/portfolio/portfolio.component";
import Resume from "./routes/resume/resume.component";
import About from "./routes/about/about.component";
import Compose from "./routes/compose/compose.component";

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResumeProvider>
      <RouterProvider router={router} />
    </ResumeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
