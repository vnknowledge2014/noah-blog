import { useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import db from '@config/firebase';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passConf, setPassConf] = useState<string>('');
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (password !== passConf) {
      setError('Password and password confirmation does not match');

      setPassword('');
      setPassConf('');
      return null;
    }

    await db
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err.code, err.message);
      });

    router.push('/Blog');
    router.reload();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleRegister}
            className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          >
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Tailwind Register
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
                autoComplete="true"
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="mb-2">
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="repassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Confirm Password"
                name="repassword"
                required
                autoComplete="current-password"
                value={passConf}
                onChange={({ target }) => setPassConf(target.value)}
              />
            </div>
            <p className="mb-4 text-center text-xs text-red-500">{error}</p>
            <div className="flex items-center justify-center">
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
              >
                Register
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

export default Register;
