import Nav from '@components/Nav';
import { useState } from 'react';

const Blog = () => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <>
      <Nav {...{ handleActive, active }} />
    </>
  );
};

export default Blog;
