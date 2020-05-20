export default interface UserDefinedTableMetaData {
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
    Hidden?: false,
    Owner?: { 
        UUID: string
    }
  }