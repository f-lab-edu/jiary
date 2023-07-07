import { Doc, Elements } from '@/features/diaryList/apis/interfaces.ts';

const getImage = (data: Doc, elements: Elements[]): string => {
  const imageObject = elements.find(element =>
    Object.hasOwn(element, 'inlineObjectElement')
  );
  const imageId = imageObject?.inlineObjectElement?.inlineObjectId;

  if (data.inlineObjects && imageId) {
    const imageUri =
      data.inlineObjects[imageId].inlineObjectProperties.embeddedObject
        .imageProperties.contentUri;
    return `<img src="${imageUri}"`;
  }

  return ``;
};

export const getConvertedDocContent = (data: Doc | undefined): string => {
  if (!data) {
    return '';
  }
  return data?.body.content
    .map(item => {
      const elements = item.paragraph?.elements;
      let realContent = '';

      if (elements?.length >= 2) {
        realContent = getImage(data, elements);
      } else if (elements?.length === 1) {
        realContent = elements[0].textRun?.content || '';
      }

      return `<p>${realContent === '\n' ? '<br/>' : realContent}</p>`;
    })
    .join('');
};
