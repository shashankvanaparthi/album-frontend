<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <button type="button" @click="dialog = true" class="btn btn-dark m-2">
            Add Artist
          </button>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <table class="table mx-auto">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="artist in artistList" :key="artist.id">
            <tr>
              <th scope="row">{{ artist.id }}</th>
              <td>{{ artist.name }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Enter Artist Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field
                v-model="artist.name"
                name="name"
                label="Name"
                type="text"
                placeholder="Artist Name"
                required
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addArtist"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ArtistDataService from "../services/ArtistDataService";
export default {
  data() {
    return {
      name: "ArtistList",
      artistList: [],
      artist: {
        name: "",
      },
      dialog: false,
    };
  },

  methods: {
    async getAllArtists(userId) {
      const artists = await ArtistDataService.getAllArtistForUser(userId);
      return artists.data;
    },

    deleteArtist(artistId) {
      console.log("Delete Artist is clicked ", artistId);
    //   TrackDataService.deleteTrack(trackId).then(
    //     (res) => {
    //       console.log(res);
    //       const albumId = this.$route.params.id;
    //       this.getAllTracks(albumId).then(
    //         (trackList) => {
    //           this.trackList = trackList;
    //           console.log(this.trackList);
    //         },
    //         (error) => {
    //           console.log(error);
    //         }
    //       );
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    },

    addArtist() {
      console.log("Adding Artist");
      const { artist } = this;
      const userId = localStorage.userId;
      console.log(artist);
      ArtistDataService.saveArtistForUser(userId, artist).then(
        (res) => {
          console.log(res)
          this.getAllArtists(userId).then(
            (artistList) => {
              this.dialog = false;
              this.artistList = artistList;
              console.log(this.artistList);
              this.artist.name = "";
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
    const userId = localStorage.userId;
    this.getAllArtists(userId).then(
      (res) => {
        this.artistList = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>