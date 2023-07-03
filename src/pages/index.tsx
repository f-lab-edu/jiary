import Head from 'next/head';
import * as style from '../styles/style-test.css.ts';
import PageLoadingSpinner from '@/features/common/components/PageLoadingSpinner.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { useAuth } from '../features/auth/hooks/useAuth.ts';
import { useIsFetching } from '@tanstack/react-query';

export default function Home() {
  // const isPageLoading = useSelector(
  //   (state: ReducerType) => state.ui.isPageLoading
  // );
  const isPageLoading = useIsFetching({ queryKey: ['auth'] });
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
