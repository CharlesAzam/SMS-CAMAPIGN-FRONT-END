
export class Package {
    _id: string;
    name: string;
    description: string;
    content: any[];
    isFree: boolean = false;
    azamPackageMappingName: string;
    isVodAllowed: boolean = false;
    appleProductId: string;
    imageUrl: string;
    isSmartcardAddOn: boolean;
    link: string;
    validityInDays: string;
    countryDetail: any;
    noOfDays: string;
    status: boolean = false;
    price: any[]
    currency: string;
}