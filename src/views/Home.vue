<template>
  <v-container fluid>
    <v-carousel
      :continuous="false"
      :cycle="cycle"
      :show-arrows="false"
      v-model="model"
    >
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    model: 0,
    cycle: true,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
  }),
};
</script>