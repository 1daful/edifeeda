import { MediaApi } from "../api/MediaApi.js";
//import { IRepository } from "../model/IRepository.js";
//import { SupabaseRepo } from "../model/SupabaseRepo";
import { Repository } from "../model/Repository.js";
import { EdiStorage } from "src/api/storage.js";
//import { IMediaApi } from "src/api/IMediaApi.js";
import { ApiFormat } from "src/apiReqFormat/ApiFormat.js";
import { Axiosi } from "../api/Axiosi";
//import { Typesense } from "src/typesense.js";
//import { NetworkLocal } from "@/api/network.js";
/**
 * Class Media acts as delegates for the media class instances' functions.
 * @function load
 * @function createApi
 */
export class Media {
    constructor(type, isFile = false) {
        this.repository = new Repository(type, isFile);
    }
    repository;
    store = new EdiStorage();
    //search = new Typesense()
    //genre: string = '';
    client = new Axiosi();
    url = "https://api.unsplash.com/photos/random?client_id=h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE&query=";
    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type
     * @param media
     * @param params
     */
    async load(type, media, params) {
        //const mediaItems: Record<string, any>[] = [];
        //const result: Record<string, any> = {}
        try {
            for (const api of media.apis) {
                let mediaApi = new MediaApi(api);
                //mediaItems.push(mediaApi.getItems(type, params));
                //const name = mediaApi.api.constructor.name
                //NetworkLocal.test(`${name} good!`)
                const items = await mediaApi.getItems(type, params);
                //const images = await this.getImage(mediaApi, "christians")
                if (items && type == "quotes") {
                    //NetworkLocal.test(`This is item from Media load. ${items}`)
                    //this.repository.changeDB('supabase')
                    for (let index = 0; index < 1; index++) {
                        const item = items[index];
                        const image = await this.getImage(this.url, item.description);
                        item.thumbnailSmall = image.links.self;
                        item.thumbnailLarge = image.links.self;
                    }
                    /*items.forEach(async item => {
                        console.log("item description", item.description)
                      //let i = 0
                      //item.thumbnailSmall = images[i].src.original
                      const image = await this.getImage(this.url, item.description)
                      item.thumbnailSmall = image.urls.regular
                      item.thumbnailLarge = image.urls.regular
                    });*/
                    console.log("this is item from Media load: ", items);
                    await this.addItems(items);
                    //this.search.import()
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * Delegate method for a media class to register it's API objects
     * @param media
     * @param api
     */
    /*createApi(media: IMedia, ...api: IMediaApi[]) {
        media.apis.push(...api);
    }*/
    async addItems(items) {
        const result = {};
        try {
            //NetworkLocal.test("Adding items from Media")
            await this.repository.addItems(items);
        }
        catch (err) {
            console.log(err);
        }
        //console.log("Unable to load media")
        return result;
    }
    async readItems(collName, params, op) {
        let results;
        try {
            results = await this.repository.readItems(collName, params, op);
            /*for (const result of results) {
                const res = await this.repository.readItem(result._id)
                result.push(res)
            }*/
            console.log("result: ", results);
            return results;
        }
        catch (err) {
            console.log(err);
            console.log("Unable to load media");
        }
    }
    async getImage(url, query) {
        const format = new ApiFormat({
            //item.description
            keyword: query
        });
        //mediaApi = new MediaApi(new Pexels(new ApiFormat(format)))
        //const images = await mediaApi.getItems('images')
        // const pexels = new Pexels({})
        //const images = await pexels.getPhotos('e')
        const image = await this.client.load(url + query);
        return image?.data;
        //this.store.upload()
    }
}
//# sourceMappingURL=Media.js.map