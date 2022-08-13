/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import getCommerce from "../utils/commerce";
export default function Home(props) {
  const { products } = props;
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      <main className={styles.main}>
        {products.map((pro) => (
          <div key={pro.id}>
            <img src={pro.image.url} alt={pro.name} />
            <p>{pro.name}</p>
            <p>{pro.price.formatted_with_symbol}</p>
          </div>
        ))}
      </main>
      {/* 
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TDNguyen
          <span className={styles.logo}>
            <Image
              src="./logoNguyen.png"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  return { props: { products } };
}
