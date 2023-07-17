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

export interface MetaData {
  contentHints?: {
    thumbnail: {
      image: string;
      mimeType: string;
    };
  };
  thumbnailLink?: string;
  hasThumbnail?: boolean;
  name?: string;
  description?: string;
  createdTime?: string;
  modifiedTime?: string;
}

export type PatchFileArgs = {
  fileId: string;
  multipartData: FormData;
};
