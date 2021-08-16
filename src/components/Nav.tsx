import Link from 'next/link';
import Posts from '@components/Posts';
import db from '@config/firebase';
import React, { useState } from 'react';
import CreatePost from './CreatePost';
import Login from './Login';
import Register from './Register';
import { useRouter } from 'next/router';

const Nav = ({
  handleActive,
  active,
}: {
  handleActive: () => void;
  active: boolean;
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  db.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const handleLogout = () => {
    db.auth().signOut();
    router.push('/Blog');
    router.reload();
  };

  const [redirectTo, setRedirectTo] = useState('Blog');

  const Blog = (): any => {
    try {
      if (redirectTo === 'Blog') {
        return <Posts />;
      }
      if (redirectTo === 'CreatePost') {
        return <CreatePost />;
      }
      if (redirectTo === 'Login') {
        return <Login />;
      }
      if (redirectTo === 'Register') {
        return <Register />;
      }
      if (redirectTo === undefined || redirectTo === 'null') {
        return <Posts />;
      }
      return <Posts />;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex items-center flex-wrap bg-black p-3">
        <Link href="/">
          <a
            href="|"
            className="inline-flex items-center p-2 mr-4"
            onClick={(event) => event.preventDefault()}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-white h-8 w-8 mr-2"
            >
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Talwind
            </span>
          </a>
        </Link>
        <button
          className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleActive}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <a
              href="|"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-purple-500 hover:text-white"
              onClick={(event) => {
                event.preventDefault();
                setRedirectTo('Blog');
                Blog();
              }}
            >
              Blog
            </a>
            {!loggedIn ? (
              <>
                <a
                  href="|"
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-purple-500 hover:text-white"
                  onClick={(event) => {
                    event.preventDefault();
                    setRedirectTo('Login');
                    Blog();
                  }}
                >
                  Login
                </a>
                <a
                  href="|"
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-purple-500 hover:text-white"
                  onClick={(event) => {
                    event.preventDefault();
                    setRedirectTo('Register');
                    Blog();
                  }}
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <a
                  href="|"
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-purple-500 hover:text-white"
                  onClick={(event) => {
                    event.preventDefault();
                    setRedirectTo('CreatePost');
                    Blog();
                  }}
                >
                  Create Post
                </a>
                <a
                  href="|"
                  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-purple-500 hover:text-white"
                  onClick={(event) => {
                    event.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      <Blog />
    </>
  );
};

export default Nav;
