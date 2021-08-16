import db from '@config/firebase';
import { useRouter } from 'next/dist/client/router';
import { useState, SyntheticEvent } from 'react';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    await db
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message);
      });

    setUsername('');
    setPassword('');
    router.push('/Blog');
    router.reload();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          >
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Tailwind Login
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                required
                placeholder="Email"
                autoComplete="true"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2021 Tailwind Blog. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
