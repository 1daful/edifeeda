<template>
    <div>
        <q-toolbar>
            <q-toolbar-title class="uppercase">
                {{mediaType}}
            </q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md row media item-start q-gutter-md">
            <q-card class="col-2 myCard" v-for="mediaItem in media" :key="mediaItem.id">
                    <q-item v-if="mediaItem">
                    <router-link :to="{name: 'Media',
                    params: {id: mediaItem.id},
                    query: {mediaType: mediaType}
                    }">
                        <q-item-section>
                        <q-img :src="mediaItem.doc.thumbnailLarge" spinner-color="white" class="med-img" style="height: 140px; max-width: 150px">
                            <template v-slot:error>
                                <div class="absolute-full flex flex-cnter bg-negative text-white">
                                <q-icon name="error" /> Cannot load image
                                </div>
                            </template>
                        </q-img>

                        <q-item-label class="text-h5">{{mediaItem.doc.title}}</q-item-label>
                        <q-item-label class="caption text-subtitle1">{{mediaItem.doc.description?.slice(0, 180)}} <span v-if="mediaItem.doc.description?.length > 180">...</span></q-item-label>
                            <q-icon name="schedule" />{{mediaItem.doc.created}}
                        </q-item-section>
                        <!--<b-button @click="addToCollection">
                            <b-icon :icon="collIcon">
                            </b-icon>
                        </b-button>-->
                        <!--<b-button @click="addToFavourites">
                            <b-icon :icon="favIcon">
                            </b-icon>
                        </b-button>-->
                    </router-link>
                    </q-item>
                </q-card>
            </div>
        </div>
  <!--<router-link :to="{name: MediaList, params: {type: mediaItem.type}}"><p>See more</p></router-link>-->
</template>

<script lang="ts">

import { Recommender } from "../api/Recommender";
import { defineComponent } from "vue";

let recommender = new Recommender()
let media: any

export default defineComponent({
    name: 'Media',
    data() {
        return{
            media
        }
    },
    props: {
      mediaType: {
          type: String,
          required: true
      }
      /*,
      db: {
          type: Object,
          required: true
      },
      auth: {
          type: Object,
          required: true
      }*/
  },
  /*methods: {
      addToCollection() {
          if (this.firAuth.currentUser) {
              this.repository.setItem(this.media.type, this.media);
              this.icon = 'plus-square-fill'
          }
          else {
              this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
          }
      },
      addToFavourites() {
          if (this.firAuth.currentUser) {
              let subPath = `${this.media.type}/${this.media.id}/favourites`;
              let item = {id: this.firAuth.currentUser};
              this.repository.setChild(subPath, item);
              this.icon = 'heart-fill'
          }
          else {
              this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
          }
      }
  }*/
    async mounted() {
      await recommender.getMedia()
      try {
      const p = await recommender.readMedia(this.mediaType)
      if (p) {
          const q = JSON.parse(JSON.stringify(p))
          const f = q.rows
          console.log("section.mediaList: ", q)
          console.log("this.section: ", f)
          this.media = f
      }
      }
      catch(error) {
          console.log(error)
      }
    },
})
</script>

<style scoped>
	.myCard {
    width: 100%;
    max-width:250px;
    min-width: 200px;
    }
    a {
    	color: black;
    	text-decoration: none;
    }
    .uppercase {
      text-transform: uppercase;
    }
</style>
