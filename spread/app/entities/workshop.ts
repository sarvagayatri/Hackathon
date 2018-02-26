export class Workshop {
    id: string = "";
    title: string = "";
    who: string = "";
    dateTime: string = "";
    address: string = "";
    fee: string = "";
    contactNumber: string = "";
    preRequisites: string = "";
    category: string = "";
    categoryLowercase: string = "";
    city: string = "";
    cityLowercase: string = "";
    createdBy: string = "";
    createdDate: number;
    interestedCandidates: Array<string>;
    rating: number;
}