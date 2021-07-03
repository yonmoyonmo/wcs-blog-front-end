import { CookiesProvider } from "react-cookie";
import Layout from "../components/Layout";
import "xp.css/dist/XP.css";


function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}

export default MyApp;
