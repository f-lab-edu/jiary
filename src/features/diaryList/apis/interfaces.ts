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

export interface Doc {
  title: string;
  body: {
    content: Content[];
  };
  revisionId: string;
  documentId: string;
  inlineObjects?: {
    [objectKey: string]: {
      objectId: string;
      inlineObjectProperties: {
        embeddedObject: {
          imageProperties: {
            contentUri: string;
          };
        };
      };
    };
  };
}

interface Content {
  startIndex: number;
  endIndex: number;
  paragraph: {
    elements?: Elements[];
  };
}

export interface Elements {
  startIndex: number;
  endIndex: number;
  textRun?: {
    content: string;
    textStyle: {
      bold: boolean;
      italic: boolean;
      underline: boolean;
      strikethrough: boolean;
      smallCaps: boolean;
    };
  };
  inlineObjectElement?: {
    inlineObjectId: string;
  };
}

export interface MutationDocApi {
  replies: unknown;
  writeControl: {
    requiredRevisionId: string;
  };
  documentId: string;
}

export interface RequestInsertText {
  docId: string;
  insertText: InsertText;
}

export interface InsertText {
  text: string;
  location: {
    index: number;
  };
}

export interface RequestRemoveText {
  docId: string;
  deleteContentRange: DeleteContentRange;
}
export interface DeleteContentRange {
  range: {
    startIndex: number;
    endIndex: number;
  };
}
