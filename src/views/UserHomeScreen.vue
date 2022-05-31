<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dark color="blue darken-3" class="mb-1">

        </v-toolbar>
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

          <v-card-text>
            <v-row align="center" class="mx-0"> </v-row>
            <div>
              {{
                album.artist == undefined || album.artist == null
                  ? "No Artist"
                  : album.artist.name
              }}
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

            <v-btn color="deep-purple lighten-2" text @click="editAlbum(album)">
              Edit
            </v-btn>

            <v-btn color="danger lighten-2" text @click="deleteAlbum(album.id)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Edit Album Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field
                v-model="updateAlbumForm.name"
                name="name"
                label="Name"
                type="text"
                placeholder="Album Name"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="updateAlbumForm.description"
                name="description"
                label="Description"
                type="text"
                placeholder="Description"
                required
              ></v-text-field>
            </v-row>

            <v-row class="d-flex" cols="12" sm="6">
              <select
                v-model="updateAlbumForm.artistId"
                label="Artist"
                class="form-select"
              >
                <template v-for="artist in artists" :key="artist.id">
                  <option :value="artist.id">{{ artist.name }}</option>
                </template>
              </select>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="updateAlbum">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
    
<script>
import AlbumDataService from "../services/AlbumDataService";
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "AlbumsList",
  data() {
    return {
      albums: [],
      artists: [],
      dialog: false,
      searchKey: "",
      selectedAlbumToEdit: null,
      album: {
        name: "",
        description: "",
      },
      updateAlbumForm: {
        id: null,
        name: "",
        description: "",
        artistId: null,
      },
    };
  },
  methods: {
    async getAllAlbums(userId) {
      console.log("hello");
      const albums = await AlbumDataService.getAllAlbums(userId);
      const userArtists = await ArtistDataService.getAllArtistForUser(userId);
      console.log(userArtists.data);
      this.artists = userArtists.data;
      return albums.data;
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
          const userId = localStorage.userId;
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

    editAlbum(album) {
      this.selectedAlbumToEdit = album;
      this.updateAlbumForm.id = this.selectedAlbumToEdit.id;
      this.updateAlbumForm.name = this.selectedAlbumToEdit.name;
      this.updateAlbumForm.description = this.selectedAlbumToEdit.description;
      this.updateAlbumForm.artistId = this.selectedAlbumToEdit.artistId;
      this.dialog = true;
    },

    updateAlbum() {
      console.log("Upadate Album is clicked");
      const userId = localStorage.userId;
      AlbumDataService.updateAlbum(this.updateAlbumForm, userId).then(
        (response) => {
          console.log(response);
          console.log(userId);
          this.getAllAlbums(userId).then(
            (albumsList) => {
              this.albums = albumsList;
              console.log(this.albums);
              this.dialog = false;
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