import MapContext from '@/features/diary/contexts/MapContext.ts';
import { useMapAutocomplete } from '@/features/diary/hooks/useMapAutocomplete.ts';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ElementNode, TextNode } from 'lexical';
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
};

export default function FloatInput({
  isEditMode,
  setIsMap,
  selectedNode,
}: FlotInputProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [editor] = useLexicalComposerContext();
  const { autocomplete } = useMapAutocomplete(inputRef);
  const { addMarker } = useContext(MapContext);

  useEffect(() => {
    if (isEditMode && inputRef) {
      inputRef.focus();
    }
  }, [isEditMode, inputRef]);

  useEffect(() => {
    if (!autocomplete) return;
    autocomplete?.addListener('place_changed', () => {
      const place = autocomplete?.getPlace();
      const { formatted_address, name } = place;
      addMarker(place);

      editor.update(() => {
        selectedNode?.setTextContent(`📍${name}: ${formatted_address}`);
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
