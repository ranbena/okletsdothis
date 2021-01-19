import Layout from 'components/Layout';
import Form from 'components/Home/Form';
import About from 'components/Home/About';

export default function Home() {
  return (
    <Layout expandedHeader>
      <Form />
      <About />
    </Layout>
  );
}
