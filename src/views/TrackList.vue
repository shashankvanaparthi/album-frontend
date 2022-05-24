<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-row>
          <v-col class="text-right">
            <v-btn
              color="success"
              dark
              @click="dialog = true"
              v-bind="attrs"
              v-on="on"
              >Add Track</v-btn
            >
          </v-col>
        </v-row>
      </template>
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

    <v-row v-if="trackList.length == 0">
      <h1>No Tracks to display.</h1>
    </v-row>

    <v-row v-if="trackList.length != 0">
      <template v-for="track in trackList" :key="track.id">
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title class="text-h5">
                  {{ track.name }}
                </v-card-title>
                <v-card-actions>
                  <v-btn class="ml-2 mt-5" @click="deleteTrack(track.id)" outlined rounded small>
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-row>
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
    async getAllTracks(albumId) {
      const tracks = await TrackDataService.getAllTracks(albumId);
      return tracks.data;
    },

    viewTrack(trackId) {
      //This needs to be implemented
      //   this.$router.push({ name: "album", params: { id: albumId } });
      console.log("Album view more is clicked");
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
      const albumId = this.$route.params.id;
      console.log(track);
      TrackDataService.saveTrack(track, albumId).then(
        (res) => {
          console.log(res);
          this.getAllTracks(albumId).then(
            (trackList) => {
              this.dialog = false;
              this.trackList = trackList;
              console.log(this.trackList);
              (this.track.name = ""), (this.track.description = "");
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
    const albumId = this.$route.params.id;
    this.getAllTracks(albumId).then(
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
