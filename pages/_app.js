import "../styles/globals.css";
import Layout from "../components/Layout";
import { ProductContextProvider } from "../context/ProductContext";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps, products }) {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
