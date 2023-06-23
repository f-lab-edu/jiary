import Head from 'next/head';
import Counter from '../components/Counter.tsx';
import * as style from '../styles/style-test.css.ts';
import QueryTest from '../components/QueryTest.tsx';
import PageLoadingSpinner from '@/components/common/PageLoadingSpinner.tsx';
import { ReducerType } from '@/store/rootReducer.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { useAuth } from '../core/hooks/auth/useAuth.ts';

export default function Home() {
  const isPageLoading = useSelector(
    (state: ReducerType) => state.ui.isPageLoading
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <div className={style.Main}>Home</div>
        <Counter />
        <br />
        <QueryTest />
        <br />
        <ul>
          {Object.values(user).map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <button onClick={handleLogout}>Logout</button>
        {isPageLoading ? <PageLoadingSpinner /> : null}
      </main>
    </>
  );
}
