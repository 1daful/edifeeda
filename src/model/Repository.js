import { Pouchdb } from "./Pouchdb";
import { SupabaseRepo } from "./SupabaseRepo";
export class Repository {
    collName;
    constructor(collName, isFile = false) {
        this.collName = collName;
        if (isFile) {
            this.db = new SupabaseRepo();
        }
        else
            this.db = new Pouchdb(this.collName);
    }
    db;
    changeDB(db) {
        switch (db) {
            case 'pouchdb':
                this.db = new Pouchdb(this.collName);
                break;
            case 'supabase':
                this.db = new SupabaseRepo();
            default:
                break;
        }
        this.db = new SupabaseRepo();
    }
    addItem() {
        throw new Error("Method not implemented.");
    }
    addItems(param) {
        this.db.addItems(param, this.collName);
    }
    async readItem(id) {
        return await this.db.readItem(id);
    }
    async readItems(collName, params, op) {
        return await this.db.readItems(collName, params, op);
    }
    updateItem(docId, param) {
        this.db.updateItem(docId, param, this.collName);
    }
    deleteItem(docId) {
        this.db.deleteItem(docId, this.collName);
    }
    find() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=Repository.js.map