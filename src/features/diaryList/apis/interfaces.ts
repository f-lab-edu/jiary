import { docs_v1 } from 'googleapis';

export type Doc = docs_v1.Schema$Document;
export type StucturedElement = docs_v1.Schema$StructuralElement;

export interface File {
  id: string;
  kind: string;
  mimeType: string;
  name: string;
}

export interface DriveFile {
  files: File[];
  incompleteSearch?: boolean;
  kind?: string;
}
