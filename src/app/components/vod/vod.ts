export class Vod {
    _id: string;
    title: string;
    description: string;
    tags: any[];
    releaseDate: any;
    starring: string;
    director: string;
    categories: any[];
    country: any[];
    subCategories: any[];
    language: any[];
    isFree: boolean = false;
    isFreeForAzam: boolean = false;
    referenceChannelID: string;
    isSeries: boolean;
    isEpisode: boolean = false;
    contentType: string;
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