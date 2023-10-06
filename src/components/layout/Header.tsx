import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 flex w-[100vw] items-center sm:h-12'>
      <ul className='flex w-full justify-around'>
        <li>
          <Link className='linear-ivory-text' href='/'>
            Jet Lag
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/service'>
            Service
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/'>
            Shopping
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/'>
            Customer Center
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/'>
            My Page
          </Link>
        </li>
        <li>
          <Link className='linear-ivory-text' href='/'>
            Logout
          </Link>
        </li>
      </ul>
    </header>
  );
}
