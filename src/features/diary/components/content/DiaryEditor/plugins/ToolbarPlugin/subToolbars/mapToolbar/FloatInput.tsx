import MapContext from '@/features/diary/contexts/MapContext.ts';
import { useMapAutocomplete } from '@/features/diary/hooks/useMapAutocomplete.ts';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, ElementNode, TextNode } from 'lexical';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { $getMapNode } from '@/features/diary/components/content/DiaryEditor/customNodes/MapInfoNode.ts';

type FlotInputProps = {
  isEditMode: boolean;
  setIsMap: Dispatch<SetStateAction<boolean>>;
  selectedNode: TextNode | ElementNode | null;
  placeName: string;
};

export default function FloatInput({
  isEditMode,
  setIsMap,
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
      addMarker(place);

      editor.update(() => {
        const textNode = $createTextNode();
        const mapNode = $getMapNode();
        // console.log('mapNode', mapNode);

        textNode.setTextContent(`📍${name}: ${formatted_address}`);
        textNode.setMode('token');
        textNode?.setFormat('code');

        mapNode.setMapInfo({
          location: place.geometry?.location as google.maps.LatLng,
          name: place.name as string,
          placeId: place.place_id as string,
        });

        if (selectedNode?.__type === 'text') {
          selectedNode.getParent()?.replace(textNode);
        } else {
          selectedNode?.append(textNode);
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
          setIsMap(false);
        }
      }}
    />
  );
}
