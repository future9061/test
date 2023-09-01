import './index.scss'
//ctx는 context의 줄임말 같아
const App = ({ Component, pageProps }) => <Component {...pageProps} />

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx)
  return { pageProps }
}

export default App