<template>
    <v-container>
        <v-row v-if="albums.length == 0">
            <h1>No Favourite albums to display.</h1>
        </v-row>
        <v-row v-if="albums.length != 0">
            <template v-for="album in albums" :key="album.id">
                <v-card class="my-4" min-width="374">
                    <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>


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
                </v-card>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
    data() {
        return {
            albums: []
        }
    },
    methods: {
        async getAllAlbums(userId) {
            const albums = await AlbumDataService.getAllFavourites(userId);
            return albums.data;
        },

    },
    created() {
        const userId = localStorage.userId;
        console.log(userId)
        this.getAllAlbums(userId).then(
            (albumsList) => {
                this.albums = albumsList;
                console.log(this.albums);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
</script>