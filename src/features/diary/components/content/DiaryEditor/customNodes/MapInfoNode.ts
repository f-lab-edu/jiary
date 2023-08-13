import { CodeNode, SerializedCodeNode } from '@lexical/code';
import { DecoratorNode } from 'lexical';
import { ReactNode } from 'react';

type MapObject = {
  placeId: string;
  location: google.maps.LatLng;
  name: string;
};
// export class MapInfoNode extends DecoratorNode<HTMLDivElement> {
export class MapInfoNode extends DecoratorNode<ReactNode> {
  map: MapObject[];

  constructor(map = []) {
    super();
    this.map = map;
  }

  static getType() {
    return 'map-info';
  }

  static clone(): MapInfoNode {
    return new MapInfoNode();
  }

  // createDOM(config: EditorConfig): HTMLElement {
  createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.style.display = 'none';
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    return '<div></div>';
  }

  getMapInfo() {
    return this.map;
  }

  setMapInfo(map: MapObject) {
    this.map.push(map);
  }

  deleteMapInfo(placeId: string) {
    const index = this.map.findIndex(v => v.placeId === placeId);
    return this.map.splice(index, 1);
  }

  static importJSON(serializedNode: SerializedCodeNode): CodeNode {
    return CodeNode.importJSON(serializedNode);
  }

  // exportJSON(): { mapInfo: MapObject[]; type: string } {
  //   return {
  //     // ...super.exportJSON(),
  //     type: 'map-info',
  //     mapInfo: this.map,
  //   };
  // }
}

let mapNode: MapInfoNode;
export const $createMapNode = () => {
  const newMapNode = new MapInfoNode();
  mapNode = newMapNode;
  return newMapNode;
};

export const $getMapNode = () => mapNode;
