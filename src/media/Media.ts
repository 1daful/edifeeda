import { MediaApi } from "../api/MediaApi.js";
import { IMedia } from "./IMedia.js";
//import { IRepository } from "../model/IRepository.js";
//import { SupabaseRepo } from "../model/SupabaseRepo";
import { Repository } from "../model/Repository.js";
import { EdiStorage } from "src/api/storage.js";
import { Pexels } from "src/api/pic/Pexels.js";
//import { IMediaApi } from "src/api/IMediaApi.js";
import { ApiFormat } from "src/apiReqFormat/ApiFormat.js";
import { MediaType } from "src/Types.js";

//import { Typesense } from "src/typesense.js";
//import { NetworkLocal } from "@/api/network.js";

/**
 * Class Media acts as delegates for the media class instances' functions.
 * @function load
 * @function createApi
 */
export class Media {
    constructor(type: string, isFile: boolean = false) {
        this.repository = new Repository(type, isFile)
    }
    repository
    store = new EdiStorage()
    //search = new Typesense()
    //genre: string = '';

    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type
     * @param media
     * @param params
     */
    async load(type: string, media: IMedia, params?: Record<string, any>) {
        //const mediaItems: Record<string, any>[] = [];
        //const result: Record<string, any> = {}

        try {
            for (const api of media.apis) {
                let mediaApi: MediaApi = new MediaApi(api);
                //mediaItems.push(mediaApi.getItems(type, params));
                //const name = mediaApi.api.constructor.name
                //NetworkLocal.test(`${name} good!`)
                const items = await mediaApi.getItems(type, params) as unknown as MediaType[]
                //const images = await this.getImage(mediaApi, "christians")
                if (items) {
                    //NetworkLocal.test(`This is item from Media load. ${items}`)
                    //this.repository.changeDB('supabase')
                    items.forEach(item => {
                      let i = 0
                      //item.thumbnailSmall = images[i].src.original
                    });
                    console.log("this is item from Media load: ", items)
                    await this.addItems(items);
                    //this.search.import()
                }
            }

        }
        catch (err) {
            console.log(err)
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

    private async addItems(items: Record<string, any>[]): Promise<Record<string, any>> {
        const result = {}
        try {
            //NetworkLocal.test("Adding items from Media")
            await this.repository.addItems(items);
        }
        catch (err) {
            console.log(err)
        }
        //console.log("Unable to load media")
        return result
    }

    async readItems(collName?: string, params?: string[], op?: Record<string, any>) {
        let results: Record<string, any>[]
        try {
            results = await this.repository.readItems(collName, params, op)
            /*for (const result of results) {
                const res = await this.repository.readItem(result._id)
                result.push(res)
            }*/
            console.log("result: ", results)
            return results
        }
        catch (err) {
            console.log(err)
            console.log("Unable to load media")
        }

    }

    async getImage(mediaApi: MediaApi, query: string) {
        const format = new ApiFormat({
          keyword: /*item.description*/ query
        })
        //mediaApi = new MediaApi(new Pexels(new ApiFormat(format)))
          //const images = await mediaApi.getItems('images')
          const pexels = new Pexels({})
          const images = await pexels.getPhotos('e')
          return images
        //this.store.upload()
    }
    /*readItem(collName: string) {
        let item
        try {
            this.repository.readItem(collName).then(res => {
                item = res
            })
        }
        catch(err) {
            console.error(err)
        }

        return item
    }*/
}
