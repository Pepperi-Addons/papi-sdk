export default interface UserDefinedTableRow {
    InternalID?: number,
    CreationDateTime?: string,
    Hidden?: false,
    MainKey: string,
    MapDataExternalID: string,
    ModificationDateTime?: string,
    SecondaryKey: string,
    Values: string[]
}