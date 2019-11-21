
export class Package {
    id: string;
    name: string;
    description: string;
    channels: string[];
    currency: string[];
    free: boolean = false;
    azamPacakgeMappingName: string;
    isVodAllowed: boolean = false;
    isVodContentsUnlimited: boolean = false;
    noOfVodContents: string;
    noOfDaysValidity: string;
    status: boolean = false;
}