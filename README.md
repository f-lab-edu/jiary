<div align=center>
<img width="200" alt="logo" src="https://github.com/pozafly/jiary/assets/59427983/f0f3c404-f85b-416e-8134-1953054d3cda">
<br />
<br />
<br />
https://jiary.vercel.app
<br />
<br />
<strong>Jiary</strong>는 여행 다이어리를 새롭게 기록하는 웹 어플리케이션입니다.<br />
다이어리에 장소를 추가할 때마다 지도에 마크가 표시 되어 이동 경로를 쉽게 파악할 수 있습니다.
</div>
<br />
<br />

## 디렉토리 구조
```
src
 ┣ backend // API Routes 모듈화
 ┃ ┣ auth
 ┃ ┃ ┗ httpMethods // http 메서드 별 함수
 ┃ ┃   ┣ GET.ts
 ┃ ┃   ┣ POST.ts
 ┃ ┃   ┗ DELETE.ts
 ┃ ┣ common
 ┃ ┣ constants
 ┃ ┗ utils
 ┣ constants // 상수 관리
 ┣ core
 ┃ ┣ config // 앱 부팅시 세팅
 ┃ ┗ utils
 ┣ feature // 도메인 별
 ┃ ┗ [도메인]
 ┃   ┣ apis
 ┃   ┃ ┣ mutations
 ┃   ┃ ┣ queries
 ┃   ┃ ┣ index.ts // axios instance
 ┃   ┃ ┗ interaces.ts
 ┃   ┣ components
 ┃   ┣ contexts
 ┃   ┣ hooks
 ┃   ┗ pages // Next.js의 pages 폴더 내부 파일의 re-export 대상
 ┣ lib
 ┗ pages
   ┣ api
   ┗ [도메인] // feature/[도메인]/pages에서 관리
```
