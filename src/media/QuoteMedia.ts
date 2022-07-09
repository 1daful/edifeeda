import { IMedia } from "./IMedia";
import { IMediaApi } from "../api/IMediaApi";
import { Media } from "./Media";
import { PaperQuotes } from "../api/quotes/PaperQuotes";
import { TheySaidSo } from "../api/quotes/Theysaidso";
//import { BookFormat } from "@/apiReqFormat/BookFormat";
import { ZenQuotes } from "../api/quotes/ZenQuotes";
import { MediaRes } from "@/Types";
//import { NetworkLocal } from "../api/network";
export class QuoteMedia implements IMedia {
    apis: IMediaApi[] = [];
    //private mediaItems: Record<string, any>[] = [];
    media: Media;
    //theySaidSo: IMediaApi;
    //paperQuotes: IMediaApi;
    zenQuotes: IMediaApi;
    //bookFormat: BookFormat = new BookFormat()

    constructor(type: MediaRes) {
        //this.paperQuotes = new PaperQuotes();
        //this.theySaidSo = new TheySaidSo();
        this.zenQuotes = new ZenQuotes()
        this.media = new Media(type);
        this.apis.push(/*this.theySaidSo, */this.zenQuotes)
    }

    async getMedia(params?: Record<string, any>) {
        //let res = {}
        try {
            await this.media.load('quotes', this, params);
            console.log("checking res from QuoteMdia: ")
        }
        catch (err) {
            console.log(err);
            console.log("QuoteMedia not successful")
        }
    }

    async readMedia(params?: string[], op?: Record<string, any>) {
        try {
            //NetworkLocal.test("Reading items from QuoteMedia")
            const res = await this.media.readItems('quotes', params, op)
            /*if(res) {
                res.forEach(async element => {
                    const image = await this.media.getImage(this.media.url, element.description)
                    if(image) element.thumbnailSmall = image.urls.regular
                });
            }*/
                
            console.log("QuoteMdia res: ", res)
            return res
        }
        catch (err) {
            console.log(err)
        }
        console.log("Unable to load quote")
    }

    /*getQOD(): Promise<Record<string, any>> {
        return this.media.readItem('quotes')
    }*/

}
