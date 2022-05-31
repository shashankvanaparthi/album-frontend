<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <!-- <div class="input-group">
            <input
              type="text"
              v-model="search"
              class="form-control mx-auto"
              placeholder="Search"
              aria-label="albumSearch"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button @click="search" class="btn btn-dark" type="button">
                Search
              </button>
            </div>
          </div> -->
          <button type="button" @click="dialog = true" class="btn btn-dark m-2">
            Add Track
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
          <template v-for="track in trackList" :key="track.id">
            <tr>
              <th scope="row">{{ track.id }}</th>
              <td>{{ track.name }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Enter Track Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field
                v-model="track.name"
                name="name"
                label="Name"
                type="text"
                placeholder="Track Name"
                required
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addTrack"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TrackDataService from "../services/TrackDataService";
export default {
  data() {
    return {
      name: "TrackList",
      trackList: [],
      track: {
        name: "",
      },
      dialog: false,
    };
  },

  methods: {
    async getAllTracks(userId) {
      const tracks = await TrackDataService.getAllTracksForUser(userId);
      return tracks.data;
    },

    deleteTrack(trackId) {
      console.log("Delete Track is clicked ", trackId);
      TrackDataService.deleteTrack(trackId).then(
        (res) => {
          console.log(res);
          const albumId = this.$route.params.id;
          this.getAllTracks(albumId).then(
            (trackList) => {
              this.trackList = trackList;
              console.log(this.trackList);
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

    addTrack() {
      console.log("Adding Track");
      const { track } = this;
      const userId = localStorage.userId;
      console.log(track);
      TrackDataService.saveTrackForUser(userId, track).then(
        (res) => {
          console.log(res)
          this.getAllTracks(userId).then(
            (trackList) => {
              this.dialog = false;
              this.trackList = trackList;
              console.log(this.trackList);
              this.track.name = "";
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
    this.getAllTracks(userId).then(
      (res) => {
        this.trackList = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>