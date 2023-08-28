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

  setMapInfo(map: google.maps.places.PlaceResult) {
    this.map = map;
  }

  deleteMapInfo() {
    this.map = {
      place_id: '',
      name: '',
      geometry: {
        location: {
          lat() {
            return 0;
          },
          lng() {
            return 0;
          },
          equals() {
            return false;
          },
          toJSON() {
            return {
              lat: 0,
              lng: 0,
            };
          },
          toUrlValue() {
            return '';
          },
        },
      },
    };
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
