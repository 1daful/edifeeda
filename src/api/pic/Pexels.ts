import config from '../../../public/config.json';
import { ApiFormat } from 'src/apiReqFormat/ApiFormat';
import { Axiosi } from '../Axiosi';
import { IMediaApi } from '../IMediaApi';
import { Resource } from '../Resource';
import { MediaType } from "../../Types";
export class Pexels implements IMediaApi{
  constructor(apiFormat: ApiFormat) {
    this.apiFormat = apiFormat
  }
  client = new Axiosi();
  resources: Resource[] = [];
  apiFormat: ApiFormat = new ApiFormat()
  imageRes = new Resource(this, 'images', {
    name: "imageReq",
    baseUrl: "/search",
    params: {
      query: this.apiFormat.keyword,
      orientation: this.apiFormat.keyword,
      page: "",
      per_page: ""
}
  },
  "imageResp")

  getBaseUrl() {
    const url = config.api.Pexels.baseUrl
    return url
  }
  getBaseParams() {
    const confi = config.api.Pexels.config
    return confi
  }
  getData(resData: Record<string, any>) {
      let respData: Record<string, any>[] = [];
      let mData: MediaType
      for (const data of resData.items) {
          mData = {
              type: "images",
              id: data.id,
              status: '',
              privacy: '',
              publisher: {
                name: '',
                logo: '',
                description: ''
              },
              isbn: '',
              region: '',
              length: 0,
              keywords: [],
              topic: '',
              tags: [],
              description: data.src.alt,
              genre: '',
              thumbnailSmall: data.src.small,
              thumbnailLarge: data.src.large,
              created: null,
              license: '',
              title: '',
              authors: [data.photographer],
              orderBy: '',
              content: '',
              meta: {
              attribution: {
                href: config.api.Pexels.attribution.href,
                src: config.api.Pexels.attribution.src,
                authorSrc: data.photographer_url
              },
              width: data.width,
              height: data.height,
            }
          }
          //this.volumeRes.response.dataList.push(mData);
          respData.push(mData);
      }
      return respData
  }
}
