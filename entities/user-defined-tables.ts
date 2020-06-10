export interface UserDefinedTableRow {
    InternalID?: number,
    CreationDateTime?: string,
    Hidden?: boolean,
    MainKey: string,
    MapDataExternalID: string,
    ModificationDateTime?: string,
    SecondaryKey: string,
    Values: string[]
}

export interface UserDefinedTableMetaData {
    TableID: string,
    MainKeyType: {
      ID: number,
      Name: string
    },
    SecondaryKeyType: {
        ID: number,
        Name: string
    },
    CreationDate?: string,
    ModificationDate?: string,
    MemoryMode: { 
        Dormant: boolean, 
        Volatile: false
    },
    Hidden?: boolean,
    Owner?: { 
        UUID: string
    }
  }