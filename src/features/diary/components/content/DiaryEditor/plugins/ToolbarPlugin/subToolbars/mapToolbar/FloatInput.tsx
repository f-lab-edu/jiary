import { useMapAutocomplete } from '@/features/diary/hooks/useMapAutocomplete.ts';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ElementNode, TextNode } from 'lexical';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

  // const { addMarker, removeMarker } = useMapMarker(map);
  // const setMap = () => {
  //   if (!map) return;
  //   addMarker({
  //     position: {
  //       lat: 37.51175556,
  //       lng: 127.1079306,
  //     },
  //   });
  // };

  useEffect(() => {
    if (isEditMode && inputRef) {
      inputRef.focus();
    }
  }, [isEditMode, inputRef]);

  useEffect(() => {
    if (!autocomplete) return;
    autocomplete?.addListener('place_changed', () => {
      const place = autocomplete?.getPlace();
      console.log('place', place);
      const { formatted_address, name } = place;

      editor.update(() => {
        selectedNode?.setTextContent(`📍${name}: ${formatted_address}`);
      });
    });
  }, [editor, autocomplete, selectedNode]);

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
