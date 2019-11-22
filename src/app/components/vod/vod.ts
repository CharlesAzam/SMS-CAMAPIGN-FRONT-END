export class Vod {
    _id: string;
    title: string;
    description: string;
    tags: any[];
    releaseDate: any;
    starring: string;
    director: string;
    categories: any[];
    country: string;
    subCategories: any[];
    language: string;
    isFree: boolean = false;
    isFreeForAzam: boolean = false;
    isSeries: boolean;
    status: string;
    boundingBox: string;
    cdnID: string;
    duration: any;
    priceDetail: any;
    imageThumb: string;
    vodType: string
    series: any[]
    images: any[]
    packageID: any[]
    createdBy: string
}