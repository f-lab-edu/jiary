import { insertText, removeText } from '@/features/diaryList/apis/index.ts';
import { Doc, Elements } from '@/features/diaryList/apis/interfaces.ts';
import diff from 'fast-diff';

const convertSystemSourcetoHtml = (str: string) => {
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  // eslint-disable-next-line no-useless-escape
  str = str.replace(/\"/g, '&quot;');
  // eslint-disable-next-line no-useless-escape
  str = str.replace(/\'/g, '&#39;');
  return str;
};

const addParagraphTag = (content: string | undefined): string => {
  if (!content) return '';
  return convertSystemSourcetoHtml(content);
  // return `<p>${content === '\n' ? '<br/>' : content}</p>`;
};

const getImageWithTag = (data: Doc, imageObject: Elements): string => {
  const imageId = imageObject?.inlineObjectElement?.inlineObjectId;

  if (data.inlineObjects && imageId) {
    const imageUri =
      data.inlineObjects[imageId].inlineObjectProperties.embeddedObject
        .imageProperties.contentUri;
    // TODO: alt, width 등의 프로퍼티가 입력되지 않는다. quill 때문임. 링크를 통해 해결해야 함.
    // https://velog.io/@pds0309/nextjs%EC%97%90%EC%84%9C-Quill-Editor-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0
    const imgTag = `<img src="${imageUri}" width="300" height="286.5" loading="lazy" alt="${imageId}-image" />`;
    return addParagraphTag(imgTag);
  }

  return ``;
};

export const getConvertedDocContent = (data: Doc | undefined): string => {
  if (!data) {
    return '';
  }
  return data?.body.content
    .map((item, contentIndex) => {
      const elements = item.paragraph?.elements;

      return elements
        ?.filter((_, index) => index === 0)
        ?.map(element => {
          if (Object.hasOwn(element, 'inlineObjectElement')) {
            return getImageWithTag(data, element);
          }
          if (!element.textRun) return '';

          let content = element.textRun.content;
          if (contentIndex === data?.body.content.length - 1) {
            content = element.textRun.content.split('\n')[0];
          }
          return content;
        });
    })
    .join('');
};

type DiffResult = [number, string];
const convertNewLineTwiceRemove = (result: DiffResult[]): DiffResult[] =>
  result.map(value => [value[0], value[1].replaceAll(/\n\n/gi, '\n')]);

/**
 * Diff 함수를 돌리는 타이밍.
 *  1. throttle이 지난 시간.
 *  2. selection이 찍힌 순간.
 */
type DiffArgs = {
  oldValue: string;
  newValue: string;
  caretLocation: number;
  docId: string;
};
export const callDiffApi = ({
  oldValue,
  newValue,
  caretLocation,
  docId,
}: DiffArgs): void => {
  const result = convertNewLineTwiceRemove(diff(oldValue, newValue));

  result.forEach(el => {
    const [status, value] = el;
    if (status === 1) {
      insertText({
        docId,
        insertText: {
          location: { index: caretLocation - value.length },
          text: value,
        },
      });
    }

    if (status === -1) {
      const endIndex = caretLocation + value.length;
      removeText({
        docId,
        deleteContentRange: {
          range: { startIndex: caretLocation, endIndex },
        },
      });
    }
  });
};
