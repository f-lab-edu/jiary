import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import * as style from '@/features/diaryList/components/DiaryEditor/DiaryEditor.css.ts';

const QuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [[{ size: [false, 'large'] }], ['bold'], ['link', 'image']],
  clipboard: {
    matchVisual: false,
  },
};

const formats = ['size', 'bold', 'link', 'image'];

export default function DiaryEditor({ docData }: { docData: string }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(docData);
  }, [docData]);

  return (
    <QuillWrapper
      className={style.wrapper}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={setValue}
    />
  );
}
