import { SerializedTextNode, TextNode } from 'lexical';

export type Map = {
  placeId: string;
  name: string;
  location: {
    lat?: number;
    lng?: number;
  };
};

type SerializedMapNode = SerializedTextNode & { map: Map };

export class MapInfoNode extends TextNode {
  map: Map = {
    placeId: '',
    name: '',
    location: {},
  };
  text: string;

  constructor(text: string, map: Map) {
    super(text);
    this.text = text;
    this.map = map;
    this.setTextContent(text);
    this.setMode('token');
    this.__type = 'map-info-node';
  }

  static getType() {
    return 'map-info-node';
  }

  static clone(node: TextNode): MapInfoNode {
    return new MapInfoNode(node.getTextContent(), node.map);
  }

  createDOM(): HTMLElement {
    const wrapper = document.createElement('div');
    const span = document.createElement('span');
    span.style.backgroundColor = 'rgb(240, 242, 245)';
    span.style.padding = '1px 0.25rem';
    span.style.fontFamily = 'Menlo, Consolas, Monaco, monospace';
    span.style.fontSize = '94%';
    span.textContent = this.text;

    const info = document.createElement('div');
    info.style.display = 'none';
    info.classList.add('map-info');
    info.textContent = JSON.stringify(this.map);

    wrapper.appendChild(span);
    wrapper.appendChild(info);

    return wrapper;
  }

  getMapInfo() {
    return this.map;
  }

  setMapInfo(map: Map) {
    this.map = map;
  }

  deleteMapInfo() {
    this.map = {
      placeId: '',
      name: '',
      location: {
        lat: 0,
        lng: 0,
      },
    };
  }

  static importJSON(serializedMapNode: SerializedMapNode): TextNode {
    return $createMapInfoNode(serializedMapNode.text, serializedMapNode.map);
  }

  exportJSON(): SerializedTextNode & { map: Map; type: string } {
    return {
      ...super.exportJSON(),
      type: 'map-info-node',
      map: this.map,
    };
  }
}

export const $createMapInfoNode = (text: string, map: Map) =>
  new MapInfoNode(text, map);
