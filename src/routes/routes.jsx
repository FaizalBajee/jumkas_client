import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import LandingPage from "../components/landingPage/LandingPage";
import Layout from "../components/layout/Layout";
import Product from "../components/product/Product";

// Custom scroll restoration function
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

// Wrapper component for ScrollToTop
const PageWrapper = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageWrapper>
        <Layout>
          <LandingPage />
          <Product />
        </Layout>
      </PageWrapper>
    ),
  }
]);

export default router;
