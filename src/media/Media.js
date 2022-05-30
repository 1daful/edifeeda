import { MediaApi } from "../api/MediaApi.js";
//import { IRepository } from "../model/IRepository.js";
//import { SupabaseRepo } from "../model/SupabaseRepo";
import { Repository } from "../model/Repository.js";
import { EdiStorage } from "src/api/storage.js";
import { Pexels } from "src/api/pic/Pexels.js";
import { ApiFormat } from "src/apiReqFormat/ApiFormat.js";
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
                if (items) {
                    //NetworkLocal.test(`This is item from Media load. ${items}`)
                    //this.repository.changeDB('supabase')
                    this.getImage(mediaApi, items);
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
    getImage(mediaApi, items) {
        items.forEach(async (item) => {
            const format = new ApiFormat({
                query: item.content
            });
            mediaApi = new MediaApi(new Pexels(new ApiFormat(format)));
            const images = await mediaApi.getItems('images');
            images[0].thumbnailSmall;
        });
        //this.store.upload()
    }
}
//# sourceMappingURL=Media.js.map