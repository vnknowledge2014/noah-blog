import db from '@config/firebase';
import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';
import { Post, PostId } from '@typings/Post';
import Image from 'next/image';

const Posts = () => {
  const [posts, setPosts] = useState<PostId[]>([]);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined | null>(null);

  const showModal = async (postId: string) => {
    await db
      .firestore()
      .collection('blog')
      .doc(postId)
      .get()
      .then((result) => setPost(result.data() as Post));
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  useEffect(() => {
    db.firestore()
      .collection('blog')
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PostId[];
        setPosts(blogs);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="container mx-auto">
          <ul className="inline-flex space-x-5">
            {posts.map((blog) => (
              <li key={blog?.id} className="flex-1">
                <div className=" bg-white  mx-auto shadow-lg rounded-lg hover:shadow-xl transition duration-200 max-w-sm">
                  <Image
                    className="rounded-t-lg"
                    src={blog?.coverImage}
                    alt={blog?.title}
                  />
                  <div className="py-4 px-8">
                    <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">
                      {blog?.title}
                    </h1>
                    <p className="hover:cursor-pointer py-3 text-gray-600 leading-6 truncate ...">{`${blog?.content}...`}</p>
                    <button
                      className="text-20 font-bold transition duration-150 border-b-4 border-transparent hover:border-purple-500"
                      onClick={() => showModal(blog?.id)}
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isShown ? (
        <>
          <div className="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed">
            <div className="z-50 relative p-3 mx-auto my-0 max-w-full w-auto">
              <div className="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
                <button
                  onClick={closeModal}
                  className="fill-current h-6 w-6 absolute right-0 top-0 m-6 font-3xl font-bold"
                >
                  &times;
                </button>
                <div className="px-6 py-3 text-xl border-b font-bold">
                  {post?.title}
                </div>
                <div className="p-6 flex-grow">
                  <Image
                    className="w-full"
                    src={post?.coverImage}
                    alt={post?.title}
                  />
                  <MDEditor.Markdown source={post?.content} />
                </div>
                <div className="px-6 py-3 border-t">
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="bg-gray-700 text-gray-100 rounded px-4 py-2 mr-1"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};
export default Posts;
