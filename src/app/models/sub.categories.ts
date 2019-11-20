export class SubCategory {
    public _id: string
    public type: string
    public status: boolean
    public isDeleted: boolean
    public name: string
    public image: string
    public boundingBox: string
    public parentCatID: string
    public priority: number
    public language: string
    constructor() { }
}