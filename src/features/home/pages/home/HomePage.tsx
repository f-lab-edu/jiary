import * as style from '@/features/home/pages/home/HomePage.css.ts';
import Head from 'next/head';
import Image from 'next/image';
import MapIcon from 'public/icons/map.svg';
import CloudIcon from 'public/icons/cloud.svg';
import LockIcon from 'public/icons/lock2.svg';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>홈 입니다</title>
      </Head>
      <div className={style.container}>
        <section className={style.titleSection}>
          <h1 className={style.title}>
            <span className="title-item">마음에 남는 순간을 기록하고,</span>
            <span className="title-item">지도에 마커로 남겨보세요</span>
          </h1>
        </section>
        <section className={style.imageSection}>
          <div className={style.imageSectionBackground}></div>
          <Image
            src="/home/main.png"
            width={900}
            height={590}
            alt="feature image"
            className={style.mainImage}
          />
        </section>
        <section className={style.descriptionSection}>
          <div className={style.paragraphSection}>
            <p className={style.paragraph}>
              <strong>Jiary</strong>는 여행 다이어리를 새롭게 기록하는 웹
              어플리케이션입니다.
            </p>
            <p className={style.paragraph}>
              디지털 기술과 모험의 정신을 조화롭게 결합하여, 여러분의 여정을
              독특한 방식으로 기록할 수 있도록 도와줍니다.
            </p>
          </div>

          <ul className={style.ul}>
            <li className={style.li}>
              <div
                className={`${style.descriptionIcon} ${style.mapIconWrapper}`}
              >
                <MapIcon width={24} height={24} className={style.mapIcon} />
              </div>
              <div>
                <div className={style.liTitle}>자동 지도 마커</div>
                <div className={style.liDescription}>
                  여행 경험을 다이어리에 적을 때, 우리 어플리케이션은 자동으로
                  지도에 여행한 장소의 마커를 생성합니다. 이 기능을 통해
                  여행지의 위치를 지도 상에 시각적으로 확인할 수 있습니다.
                </div>
              </div>
            </li>

            <li className={style.li}>
              <div
                className={`${style.descriptionIcon} ${style.cloudIconWrapper}`}
              >
                <CloudIcon
                  width={24}
                  height={24}
                  className={`${style.cloudIcon} cloud-icon`}
                />
              </div>
              <div>
                <div className={style.liTitle}>오프라인 접근성</div>
                <div className={style.liDescription}>
                  여행 중에 인터넷 연결이 어려울 때도 걱정하지 마세요.
                  오프라인에서 다이어리를 작성하고 인터넷에 연결되면 자동으로
                  동기화되어 기억을 보존합니다.
                </div>
              </div>
            </li>

            <li className={style.li}>
              <div className={`${style.descriptionIcon} ${style.lockIcons}`}>
                <LockIcon width={24} height={24} />
              </div>
              <div>
                <div className={style.liTitle}>개인 정보 보호</div>
                <div className={style.liDescription}>
                  개인 정보 보호의 중요성을 이해합니다. 여행 다이어리는 개인
                  Google Drive에 저장되며, 외부에 유출되지 않습니다.
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section className={style.footerSection}>
          <Link href={'/diary'} className={style.diaryLink}>
            사용해보기
          </Link>
        </section>
      </div>
    </>
  );
}
