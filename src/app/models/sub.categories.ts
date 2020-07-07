export class SubCategory {
    public _id: string
    public type?: string
    public status: boolean
    public isDeleted: boolean
    public content: any[]
    public name: string
    public boundingBox: string
    public parentCatID: any
    public priority: number
    public language: string
    public isContinueWatching : boolean
    public isWatchSuggestion: boolean
    constructor() { }
}