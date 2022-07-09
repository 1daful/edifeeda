export type MediaType = {
  id: string
  title: string
  type: string
  authors: {
          name: string,
          pic: string,
          bio: string
  }[]
  publisher: {
          name: string,
          logo: string,
          description: string
  }
  status: string
  meta: any
  privacy: string
  topic: string
  isbn: string
  license: string
  //lccl: string
  //oclc: string
  //format: string
  //printType: string
  orderBy: string
  content: string
  created: any
  thumbnailSmall: string
  thumbnailLarge: string
  genre: string
  tags: []
  region: string
  length: number

  description: string
  keywords: []
}

export type AuthorType = {
  name: string
  pic: string
  bio: string
}

export type ConfigType = {
  header: any
  baseParam: any
}

export type Params = {
  limit: number
}

export type MediaRes = "quotes" | "videos" | "books" | "music" | "quote" | "video" | "book" | "track" | "collections" | "images"