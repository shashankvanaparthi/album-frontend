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

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="viewAlbum(album.id)"
            >
              View
            </v-btn>
            <v-btn color="danger lighten-2" text @click="deleteAlbum(album.id)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          @click="dialog = true"
          v-bind="attrs"
          v-on="on"
        >
          Add Album
        </v-btn>
      </template>
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Enter Album Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field
                v-model="album.name"
                name="name"
                label="Name"
                type="text"
                placeholder="Album Name"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="album.description"
                name="description"
                label="Description"
                type="text"
                placeholder="Description"
                required
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addAlbum"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
    
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "AlbumsList",
  data() {
    return {
      albums: [],
      dialog: false,
      searchKey:"",
      album: {
        name: "",
        description: "",
      },
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

    viewAlbum(albumId) {
      this.$router.push({ name: "album", params: { id: albumId } });
      console.log("Album view more is clicked");
    },

    deleteAlbum(albumId) {
      console.log("Delete Album is clicked ", albumId);
      AlbumDataService.deleteAlbum(albumId).then(
        (res) => {
          console.log(res);
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
        (error) => {
          console.log(error);
        }
      );
    },

    addAlbum() {
      console.log("Adding Album");
      const { album } = this;
      const userId = this.$route.params.id;
      AlbumDataService.saveAlbum(album, userId).then(
        (res) => {
          console.log(res);
          this.getAllAlbums(userId).then(
            (albumsList) => {
              this.dialog = false;
              this.albums = albumsList;
              console.log(this.albums);
              (this.album.name = ""), (this.album.description = "");
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
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