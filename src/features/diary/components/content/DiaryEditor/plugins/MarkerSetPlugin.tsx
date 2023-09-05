import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, $getRoot, NodeKey } from 'lexical';
import { useContext, useEffect, useRef, useState } from 'react';

import { MetaData } from '@/features/diary/apis/interfaces.ts';
import { MapInfoNode } from '@/features/diary/components/content/DiaryEditor/customNodes/MapInfoNode.ts';
import MapContext from '@/features/diary/contexts/MapContext.ts';

type Props = {
  metaData: MetaData;
};

export function MarkerSetPlugin({ metaData }: Props) {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { map, addMarker, removeMarker, saveDiary } = useContext(MapContext);
  const mapInfoNodeList = useRef(new Map<NodeKey, MapInfoNode>());

  useEffect(() => {
    if (!map) return;
    editor.update(() => {
      const root = $getRoot();
      const all = root.getAllTextNodes();

      const filteredMapInfoNodeList = all.filter(
        node => node.getType() === 'map-info-node',
      ) as MapInfoNode[];

      filteredMapInfoNodeList.forEach((node, index) => {
        setTimeout(() => addMarker(node.map), (index + 1) * 400);
      });
    });
    setIsFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (!editor.hasNodes([MapInfoNode])) return;
    return editor.registerMutationListener(MapInfoNode, mutatedNodes => {
      for (const [nodeKey, mutation] of mutatedNodes) {
        if (mutation === 'created' || mutation === 'updated') {
          editor.update(() => {
            const mapInfoNode = $getNodeByKey<MapInfoNode>(
              nodeKey,
            ) as MapInfoNode;

            if (!isFirstRender) {
              addMarker(mapInfoNode.map);
            }

            if (!metaData.description && mapInfoNodeList.current.size === 0) {
              saveDiary({ metaData: { description: mapInfoNode.map.name } });
            }
            const clonedState = editor.getEditorState().clone(null);
            editor.setEditorState(clonedState);

            mapInfoNodeList.current.set(nodeKey, mapInfoNode);
          });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, isFirstRender, addMarker, saveDiary]);

  useEffect(() => {
    if (!editor.hasNodes([MapInfoNode])) return;
    return editor.registerMutationListener(MapInfoNode, mutatedNodes => {
      for (const [nodeKey, mutation] of mutatedNodes) {
        if (mutation === 'destroyed') {
          const mapInfoNode = mapInfoNodeList.current.get(nodeKey);
          if (mapInfoNode === undefined) return;

          const deleteNodeTitle = mapInfoNode.map.name;
          if (deleteNodeTitle) {
            removeMarker(deleteNodeTitle);
          }

          mapInfoNodeList.current.delete(nodeKey);
        }
      }
    });
  }, [editor, removeMarker]);

  return null;
}
