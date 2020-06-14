export interface FileStorage {
  InternalID?: number,
  Configuration?: {
    ObjectType?: string,
    Type?: string,
    RequiredOperation?: string
  },
  Content?: any, //null
  CreationDate?: string,
  Description?: string,
  FileName?: string,
  Hidden?: boolean,
  IsSync?: boolean, //null/any?
  MimeType?: string,
  ModificationDate?: string,
  Title?: string,
  URL?: string
}