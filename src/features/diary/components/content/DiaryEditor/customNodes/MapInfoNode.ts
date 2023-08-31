import { SerializedTextNode, TextNode } from 'lexical';

type SerializedMapNode = SerializedTextNode & {
  map: google.maps.places.PlaceResult;
};

export class MapInfoNode extends TextNode {
  map: google.maps.places.PlaceResult;
  text: string;

  constructor(text: string, map: google.maps.places.PlaceResult) {
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
    span.style.display = 'inline-block';
    span.style.backgroundColor = 'rgb(240, 242, 245)';
    span.style.padding = '4px 4px 4px 16px';
    span.style.margin = '8px 4px 8px';
    span.style.fontFamily = 'Menlo, Consolas, Monaco, monospace';
    span.style.fontSize = '94%';
    span.textContent = this.text;
    span.style.borderLeft = '4px solid rgb(206, 208, 212)';

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

  setMapInfo(map: google.maps.places.PlaceResult) {
    this.map = map;
  }

  static importJSON(serializedMapNode: SerializedMapNode): TextNode {
    return $createMapInfoNode(serializedMapNode.text, serializedMapNode.map);
  }

  exportJSON(): SerializedTextNode & {
    map: google.maps.places.PlaceResult;
    type: string;
  } {
    return {
      ...super.exportJSON(),
      type: 'map-info-node',
      map: this.map,
    };
  }
}

export const $createMapInfoNode = (
  text: string,
  map: google.maps.places.PlaceResult,
) => new MapInfoNode(text, map);
