export class Package {
    id: string;
    name: string;
    description: string;
    content: any[];
    free: boolean = false;
    isVodAllowed: boolean = false;
    isVodContentsUnlimited: boolean = false;
    noOfVodContents: string;
    noOfDaysValidity: string;
    status: boolean = false;
}