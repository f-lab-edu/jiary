import MapContext from '@/features/diary/contexts/MapContext.ts';
import { useMapAutocomplete } from '@/features/diary/hooks/useMapAutocomplete.ts';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createParagraphNode, $getRoot, ElementNode, TextNode } from 'lexical';
import { useContext, useEffect, useState } from 'react';
import { $createMapInfoNode } from '@/features/diary/components/content/DiaryEditor/customNodes/MapInfoNode.ts';

type FlotInputProps = {
  isEditMode: boolean;
  changeIsMapState: (isMap: boolean) => void;
  selectedNode: TextNode | ElementNode | null;
  placeName: string;
};

export default function FloatInput({
  isEditMode,
  changeIsMapState,
  selectedNode,
  placeName,
}: FlotInputProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [editor] = useLexicalComposerContext();
  const { autocomplete } = useMapAutocomplete(inputRef);
  const { addMarker } = useContext(MapContext);

  useEffect(() => {
    if (isEditMode && inputRef) {
      const value = placeName.includes('📍') ? placeName.slice(2) : placeName;
      inputRef.value = value;
      inputRef.focus();
    }
  }, [isEditMode, inputRef, placeName]);

  useEffect(() => {
    if (!autocomplete) return;
    autocomplete?.addListener('place_changed', () => {
      const place = autocomplete?.getPlace();
      const { formatted_address, name } = place;

      editor.update(() => {
        const mapInfoNode = $createMapInfoNode(
          `📍${name}: ${formatted_address}`,
          place,
        );
        if (
          selectedNode?.__type === 'text' ||
          selectedNode?.__type === 'map-info-node'
        ) {
          selectedNode?.replace(mapInfoNode);
        } else if (!selectedNode || selectedNode?.__type === 'root') {
          const root = $getRoot();
          const paragraghNode = $createParagraphNode();
          paragraghNode.append(mapInfoNode);
          root.append(paragraghNode);
        } else {
          selectedNode?.append(mapInfoNode);
        }
      });
    });
  }, [editor, autocomplete, selectedNode, addMarker]);

  return (
    <input
      ref={node => setInputRef(node)}
      className="link-input"
      onKeyDown={event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          changeIsMapState(false);
        }
      }}
    />
  );
}
