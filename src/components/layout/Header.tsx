import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { authState } from '@/store/auth';

export default function Header() {
  const setAuth = useSetRecoilState(authState);
  const route = useRouter();
  const auth = useRecoilValue(authState);
  const logout = () => {
    deleteCookie('Authorization');
    deleteCookie('session-cookie');
    setAuth({
      status: 'none',
      user: {
        email: null,
        age: null,
        phone: null,
        birthday: null,
        sleepTime: null,
        wakeupTime: null,
      },
    });

    route.push('/jetlag/login');
  };

  return (
    <header className='sticky top-0 flex h-12 w-[100vw] items-center'>
      <ul className='flex w-full justify-around'>
        <li>
          <Link className='linear-ivory-text' href='/jetlag'>
            Jet Lag
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/service'>
            Service
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/shopping'>
            Shopping
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/customer'>
            Customer Center
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/jetlag/myPage'>
            My Page
          </Link>
        </li>
        {auth.status === 'login' ? (
          <li>
            <Link
              className='linear-ivory-text'
              href='/jetlag/login'
              onClick={logout}
            >
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link className='linear-ivory-text' href='/jetlag/login'>
              Login
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}
