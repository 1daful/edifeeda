import { IRepository } from "./IRepository";
import PouchDB from 'pouchdb';
//import config from 'pouchdb';
//import { Utility } from "../Utility";
//import { FIRepository } from "./FIRepository";

export class Pouchdb implements IRepository {
    constructor(collName: string) {
        this.db = new PouchDB(collName, {skip_setup: true})
        /*const remoteDB = new PouchDB(config.api.PouchDB.url)
        this.db.sync(remoteDB, {
          live: true, retry: true
        }).on('change', (change: any) => {
           // yo, something changed!
          }).on('paused', function (info: any) {
              // replication was paused, usually because of a lost connection
          }).on('active', function (info: any) {
              // replication was resumed
          }).on('error', function (err: any) {
               // totally unhandled error (shouldn't happen)
              });*/


    }
    //repository: IRepository;
    //name: string;
    //message!: string;
    //remoteCouch = false;
    db: any;
    //PouchDB = require('pouchdb')

    /**
     * Save index.
     * @param collName
     */
    /*setItems(collName: string) {
        this.db = new PouchDB(collName)
        this.db.put(this.ddoc).then(function () {
            console.log('success')
        }).catch(function(err: any) {
            console.log(err)
        })
    }*/

    /*Query(collName: string, id: string) {
        this.db = new PouchDB(collName);
        this.db.query(id).then(function (res: any) {
            console.log(res)
        }).catch(function(err: any) {
            console.log(err)
        })
    }*/

    async addItem(item: Record<string, any>): Promise<Record<string, any>> {
        let response
        if (item) {
            item._id = new Date().toISOString();

            try {
                response = await this.db.put(item);
                console.log("checking response from Repository: ", response);
                return response
            }
            catch(err) {
                console.log("From db", item)
                console.log(err)
            }
        }
        return response
    }

    async addItems(items: Record<string, any>[], collName?: string) {
        //const newItems = []
        try {
            /*for (const item of items) {
                //item._id = new Date().toISOString();
                //item._id = item.id
                newItems.push(item)
            }*/
            //await this.db.bulkDocs(newItems)
            await this.db.bulkDocs(items)
        }
        catch(err) {
            console.log(err)
        }
    }

    async readItems(collName?: string, params?: string[], op?: Record<string, any>): Promise<Record<string, any>[]> {
        let items;
        //const params = new Utility().getDefault({include_doc: true}, filters)
        if (params && op) {
            try {
                //items = await this.find(params, op)
                items = await this.db.allDocs( {include_docs: true} );
                //console.log('with params: ', items)
            }
            catch(err) {
                console.log(err)
            }
        }

        else {
            try {
                items = await this.db.allDocs( {include_docs: true} );
                //console.log("without params: ", items)
            }
            catch(err) {
                console.log(err)
            }
        }
        return items
    }

    async readItem(collName: string): Promise<any> {
        let item;
        try {
            item = await this.db.get(collName).then();
        }
        catch(err) {
            console.log(err)
        }

        return item
    }

    async updateItem(docId: string, param: Record<string, any>) {
        try {
            const doc = await this.db.get(docId);
            const response = await this.db.put(doc, param);
            return response
        }
        catch(err) {
            console.log(err)
        }
    }

    /*setChild(subPath: string, item: Record<string, any>) {}*/

    async deleteItem(docId: string) {
        try {
            const doc = await this.db.get(docId);
            const response = await this.db.remove(doc);
            return response
        }
        catch(err) {
            console.log(err)
        }
    }

    private async createIndex(...fields: string[]) {
        try{
            await this.db.createIndex({
                index: {fields: [fields]}
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    /**
     * Each parameter provided are part of the find query object parameter.
     * @param sort
     * @param limit
     * @param op The op arg is used for knowing which comparison value to use.
     * @param params This array must follow the order of the op arg.
     */
    async find(params: string[], op: Record<string, any>, sort?: string, limit?: number) {
        this.createIndex(...params)
        try {
            const selector = {}
            /*let opObj
            Object.keys(op).forEach(key => {
                switch (op[key]) {//<, > <=, >=, ==
                    case '<':

                        break;

                    default:
                        break;
                }
            })*/
            Object.keys(op).forEach(key => {
                let i = 0; //index has a base value of 0.
                const sel = {
                    [params[i]]: {
                        [op[key]]: key
                    }
                }
                i++;
                Object.assign(selector, sel)
            });
            this.db.find({
                //selector: params,
                selector: selector,
                sort: [sort],
                limit: limit
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    /*ddoc = {
        id: '',
        views: {
            by_name: {
                map: function(doc) {
                    emit(doc.name)
                }.toString()
            }
        }
    }*/

}
