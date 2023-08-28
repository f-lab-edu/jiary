import { MapInfoNode } from '@/features/diary/components/content/DiaryEditor/customNodes/MapInfoNode.ts';
import MapContext from '@/features/diary/contexts/MapContext.ts';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { useContext, useEffect, useState } from 'react';

export function MarkerSetPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { addMarker, map } = useContext(MapContext);

  useEffect(() => {
    if (isFirstRender || !map) return;
    editor.update(() => {
      const root = $getRoot();
      const all = root.getAllTextNodes();

      const mapInfoNodeList = all.filter(
        node => node.getType() === 'map-info-node',
      ) as MapInfoNode[];

      mapInfoNodeList.forEach((node, index) => {
        setTimeout(() => addMarker(node.map), (index + 1) * 400);
        // TODO: 마커 타이밍 적절하게
        // setTimeout(() => {
        //   addMarker(node.map);
        // }, 1000);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender, map]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return null;
}
