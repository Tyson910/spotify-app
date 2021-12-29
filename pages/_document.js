/* eslint-disable unicorn/prevent-abbreviations */
import Document, {
    Head,
    Html,
    Main,
    NextScript,
  } from 'next/document';
  
  export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps =
        await Document.getInitialProps(
          ctx
        );
      return { ...initialProps };
    }
  
    render() {
      return (
        <Html
          lang="en"
          className="scroll-smooth"
        >
          <Head>
            <link
              rel="icon"
              href="/vercel.svg"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }