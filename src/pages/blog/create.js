// /pages/blog/create.js
import CreateBlog from 'components/CreateBlog';
import withAuth from 'components/withAuth';
import Layout from 'components/Layout'; // Assuming you have a layout component

const CreateBlogPage = () => {
  return (
    // <Layout>
    <CreateBlog />
    // </Layout>
  );
};

export default withAuth(CreateBlogPage);