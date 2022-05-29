<template>
    <div class="container">
    <div class="row">
        <div class="col-sm-8">
            <q-img :src="media.thumbnailLarge"></q-img>
            <h4>
                {{media.title}}
                {{media.description}}
            </h4>
            <div v-if="media.authors">
            <div v-for="author of media.authors" :key="author.name">
            <q-avatar>
                <img v-if="author.pic" :src="author.pic" />
            </q-avatar>
              <q-item-label>{{author.name}}</q-item-label>
              </div>
            </div>
            <span>
                <q-icon name="watch_later"></q-icon>
                {{media.created}}
            </span>
            <!--<q-btn :disable="isDisabled" @click="addToCollection">
                <q-icon :name="collIcon">
                </q-icon>
            </q-btn>
            <b-button @click="addToFavourites">
                <b-icon :icon="favIcon">
                </b-icon>
                <b-badge>{{media.count}} </b-badge>
            </b-button>
            <b-button><b-icon-chat-fill></b-icon-chat-fill><b-badge> {{comment.count}} </b-badge></b-button>-->
            <div>
                {{media.description}}
            </div>

            <!-- share -->
            <div>
                <button @click="facebook"><q-icon name="facebook"></q-icon>
                    facebook
                </button>
                <span><q-icon name="twitter"></q-icon>
                    <a class="twitter-share-button" href="https://twitter.com/intent/tweet"></a>
                </span>
                <span><q-icon class="pinterest"></q-icon>
                    <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark" :data-pin-id="media.thumbnail"></a>
                </span>
            </div>
        </div>
        <!--<div class="col-sm-4">
            <div v-if="media">
                <h4>
                    Tags
                </h4>
                <p id="books-tags">
                    <span v-for="tag in media.tags" :key="tag">
                        <q-icon name="label"></q-icon>{{tag}}
                    </span>
                </p>
            </div>
            <hr />
            <MediaComponent :pos="pos"></MediaComponent>
        </div>-->
    </div>
</div>
</template>

<script lang="ts">
//import auth from "../api/auth/SupabaseAuth";
import { Repository } from "../model/Repository";
import MediaComponent from "../components/MediaComponent.vue"
import { defineComponent } from "vue";
import { IRepository } from "../model/IRepository";
import { auth } from '../api/auth/SupabaseAuth'

let user: any
let repository: IRepository
let FB: any
let media: any

export default defineComponent({
    name: 'SingleMediaPage',
    setup() {
        return {
            media,
            auth,
            pos: "sidebar",
            repository,
            collIcon: 'library_add',
            isDisabled: false,
            FB,
            user,
            //favIcon: 'hearth',
            //path: `${this.media.type}/${this.media.id}/comments`
        }
    },
    /*props: {
        id: {
            type: String,
            required: true
        },
        mediaType: {
            type:String
        }*/
        /*db: {
            type: Object,
            required: true
        },
        auth: {
            type: Object,
            required: true
        },
        FB: {
            type: Object,
            required: true
        },*/
    //},
    components: {
        MediaComponent
    },
    methods: {
        facebook() {
            this.FB.ui({
                method: 'share',
                href: this.$route.path
            }, function(response: { error: any; }) {
                if (response && !response.error) {
                    alert('Post shared successfully!');
                }
            })
        },
        addToCollection() {
            if (this.user) {
                this.repository.addItems([ this.media ]);
                this.collIcon = 'library_add_check',
                this.isDisabled = true
            }
            else {
                this.$router.push({path: '/signin', params: {msg: 'You must login first'}});
            }
        }
        /*addToFavourites() {
            if (this.firAuth.currentUser) {
                let subPath = `${this.media.type}/${this.media.id}/favourites`;
                let item = {id: this.firAuth.currentUser};
                this.repository.setChild(subPath, item);
                this.icon = 'heart-fill'
            }
            else {
                this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
            }
        }*/
    },
    async mounted() {
        let type = this.$route.query.mediaType as string
        this.repository = new Repository(type)
        const id =this.$route.params.id as string
         this.media = await this.repository.readItem(id)
         console.log('media: ', this.media)
        //this.facebook()
    }
})
</script>
