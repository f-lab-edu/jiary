import MapContext from '@/features/diary/contexts/MapContext.ts';
import { useMapAutocomplete } from '@/features/diary/hooks/useMapAutocomplete.ts';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, ElementNode, TextNode } from 'lexical';
import { $createCodeNode } from '@lexical/code';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

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
        const codeNode = $createCodeNode();
        const textNode = $createTextNode();
        textNode.setTextContent(`📍${name}: ${formatted_address}`);
        codeNode.append(textNode);

        if (selectedNode?.__type === 'text') {
          selectedNode.getParent()?.replace(codeNode);
        } else {
          selectedNode?.append(codeNode);
        }
        // TODO: selectNode JSON

        textNode?.setFormat('code');
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
