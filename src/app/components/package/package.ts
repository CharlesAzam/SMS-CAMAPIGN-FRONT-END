
export class Package {
    _id: string;
    name: string;
    description: string;
    content: any[];
    isFree: boolean = false;
    azamPackageMappingName: string;
    isVodAllowed: boolean = false;
    link: string;
    validityInDays: string;
    countryDetail: string
    noOfDays: string;
    status: boolean = false;
    price: string | Object;
    currency: string;
}