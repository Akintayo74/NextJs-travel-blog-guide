// /pages/blog/create.js
import CreateBlog from 'components/CreateBlog';
import withAuth from 'components/withAuth';

const CreateBlogPage = () => {
  return (
    <CreateBlog />
  );
};

export default withAuth(CreateBlogPage);