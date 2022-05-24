<template>
  <v-container>
    <v-row>
      <v-col class="text-right md-3">
        <v-text-field
          v-model="searchKey"
          name="searchKey"
          type="text"
          placeholder="Search"
          required
        ></v-text-field>
      </v-col>
      <v-col class="md-3">
        <v-btn
          color="success"
          dark
          @click="searchAlbums"
          >Search</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="albums.length == 0">
      <h1>No Albums to display.</h1>
    </v-row>
    <v-row v-if="albums.length != 0">
      <template v-for="album in albums" :key="album.id">
        <v-card class="my-4" min-width="374">
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-title>{{ album.name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0"> </v-row>

            <div>
              {{ album.description }}
            </div>
          </v-card-text>

        </v-card>
      </template>
    </v-row>

  </v-container>
</template>
    
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "AlbumsList",
  data() {
    return {
      albums: [],
      searchKey:"",
    };
  },
  methods: {
    async getAllAlbums(userId) {
      console.log("hello");
      const albums = await AlbumDataService.getAllAlbums(userId);
      return albums.data;
    },

    searchAlbums(){
        const {searchKey} = this
        const userId = this.$route.params.id;
        AlbumDataService.searchAlbums(searchKey,userId).then(response=>{
          console.log(response);
          this.albums=response.data;
        },error=>{
          console.log(error)
        })
    },
  },
  created() {
    const userId = this.$route.params.id;
    this.getAllAlbums(userId).then(
      (albumsList) => {
        this.albums = albumsList;
        console.log(this.albums);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>