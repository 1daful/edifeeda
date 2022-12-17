import { IMediaApi } from "../IMediaApi";
import { Resource} from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
import config from "../../../public/config.json"

export class ZenQuotes implements IMediaApi{
    constructor(format?: {}) {
      const apiFormat = new ApiFormat(format)
      this.quoteRes(apiFormat)
      this.qod(apiFormat)
    }

    client = new Axiosi()
    config!: any
    BASE_URL = '';
    BASE_PARAMS: any;
    resources: Resource[] = [];
    apiFormat = new ApiFormat()

    quoteRes = (format: ApiFormat) => {
        new Resource(this, 'quotes',
    {
        name: 'quoteReq',
        baseUrl: '/quotes',
        params: {
            categories: '',
            images: '',
            authors: '',
            random: '',
            tags: format.tags,
            quotes: format.keyword
        }
    },
    'quoteResp'
    );
}

    qod = (format: ApiFormat) => {
        new Resource(this, 'quote',
    {
        name: 'qodReq',
        baseUrl: '/random',
        params: format
    },
    'qodResp'
    );
}

    /*data = {
        quote: 'quote',
        author: 'author',
        tags: [],
        image: 'image'
    }*/

    async getBaseParams() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config?.api.ZenQuotes.baseParams
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }
    async getBaseUrl() {
        try{
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config?.api.ZenQuotes.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }

    getData(resp: any) {
        const respData: Record<string, any>[] = [];
        let mData: Record<string, any>
        //if (resp.name === 'quoteResp')
        for (const data of resp) {
            mData = {
                type: "quotes",
                id: new Date().toJSON(),
                _id: new Date().toJSON(),
                status: '',
                privacy: '',
                tags: [],
                description: data.q,
                genre: "",
                created: '',
                license: '',
                title: '',
                publisher_id: "",
                isbn: "",
                lccl: "",
                oclc: "",
                format: "",
                printType: '',
                thumbnailSmall: '',
                authors: [
                    data.a
                ],
                thumbnailLarge: '',
                //authors: data.a,
                //tags: []
            }
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData
    }

    /*setResponse(data: Record<string, any>) {
        this.setDataSource(data);
        this.setData(this.quoteRes.response);
    }*/

}
