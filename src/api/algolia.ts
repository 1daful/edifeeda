applicationId: JFUHLV2WO0
search-only api key:
b956f9999255d6437e85e8c9a03b418d


go get github.com/algolia/algoliasearch-client-go@vX.Y.Z

npm install vue-instantsearch algoliasearch instantsearch.css


//main.js

import Vue from 'vue';
import App from './App.vue';
import InstantSearch from 'vue-instantsearch/vue3/es';

Vue.use(InstantSearch);

new Vue({
  el: '#app',
  render: (h) => h(App),
});




//const algoliasearch = require('algoliasearch')

import Al

// Connect and authenticate with your Algolia app
const client = algoliasearch('undefined', 'YourAdminAPIKey')

// Create a new index and add a record
const index = client.initIndex('test_index')
const record = { objectID: 1, name: 'test_record' }
index.saveObject(record).wait()

// Search the index and print the results
index
  .search('test_record')
  .then(({ hits }) => console.log(hits[0]))




<template>
  <ais-instant-search :search-client="searchClient" index-name="demo_ecommerce">
    <ais-search-box />
    <ais-hits>
      <template v-slot:item="{ item }">
        <h2>{{ item.name }}</h2>
      </template>
    </ais-hits>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';

export default {
  data() {
    return {
      searchClient: algoliasearch(
        'B1G2GM9NG0',
        'aadef574be1f9252bb48d4ea09b5cfe5'
      ),
    };
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>



