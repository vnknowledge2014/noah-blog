import db from '@config/firebase';
import { SyntheticEvent, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/dist/markdown-editor.css';
import '@uiw/react-markdown-preview/dist/markdown.css';

const CreatePost = () => {
  const [title, setTitle] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    db.firestore().collection('blog').add({
      title: title,
      coverImage: coverImage,
      content: content,
    });

    console.log({
      title: title,
      coverImage: coverImage,
      content: content,
    });

    setTitle('');
    setCoverImage('');
    setContent('');
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-xl text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="title"
                  id="title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-xl text-gray-600">Cover Image</label>
                <br />
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="coverImage"
                  id="coverImage"
                  placeholder="Cover Image Link"
                  value={coverImage}
                  onChange={({ target }) => setCoverImage(target.value)}
                />
              </div>
              <div className="mb-8">
                <label className="text-xl text-gray-600">
                  Content <span className="text-red-500">*</span>
                </label>
                <br />
                <div className="container">
                  <div className="border-2 border-gray-500">
                    <MDEditor value={content} onChange={setContent} />
                  </div>
                </div>
              </div>
              <div className="flex p-1">
                <button className="p-3 bg-blue-500 text-white hover:bg-blue-400">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
