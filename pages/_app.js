import "../styles/globals.css";
import Layout from "../components/Layout";
import { ProductContextProvider } from "../context/ProductContext";

function MyApp({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductContextProvider>
  );
}

export default MyApp;
