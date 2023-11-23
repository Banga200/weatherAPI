<template>
  <div>
    <v-layout>
      <v-flex xs10 sm8 md6 offset-sm-2 offset-xs1 offset-md3>
        <!-- Error  -->
        <v-layout v-if="error">
          <v-flex xs8 offset-xs3>
            <v-alert dense color="red" type="error">
              {{ error }}
            </v-alert>
          </v-flex>
        </v-layout>
        <!-- Textfiled  -->
        <v-form class="d-block d-sm-flex" @submit.prevent="getWeatherData">
          <v-text-field
            outlined
            label="Enter Country or City"
            append-icon="mdi-map"
            v-model="city"
            @keypress.enter="getWeatherData"
          ></v-text-field>
          <v-btn
            class="ml-sm-3 ml-0 mt-sm-3 mt-0"
            id="searchButton"
            color="primary"
            ref="searchBtn"
            @click="getWeatherData"
          >
            Search
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <!-- Loading Spinner  -->
    <v-layout v-if="loading" class="mt-3">
      <v-flex xs12 class="text-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <!-- Weather Card -->
    <v-layout row class="mt-3" v-if="weatherIsEmpty">
      <v-flex
        xs11
        offset-xs-1
        sm6
        offset-sm-3
        md4
        offset-md-4
        lg4
        offset-lg-4
        class="mt-3"
      >
        <v-card class="ml-3 pl-3 pl-sm-0 pa-2">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ weathers.location.name }} -
                <small>{{ weathers.location.country }}</small>
              </v-list-item-title>
              <v-list-item-subtitle>{{
                weathers.current.condition.text
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col class="display-2" cols="6">
                {{ weathers.current.temp_c }}&deg;C
              </v-col>
              <v-col cols="6">
                <v-img
                  :src="weathers.current.condition.icon"
                  alt="Sunny image"
                  width="92"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-tailwind</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle
              >{{ weathers.current.wind_kph }}km/h</v-list-item-subtitle
            >
          </v-list-item>
          <span class="pl-3"> {{ weathers.location.localtime }}</span>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cloud</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle
              >{{ weathers.current.cloud }}%</v-list-item-subtitle
            >
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- Upcoming Days  -->
    <h4 class="mt-5 text-center" v-if="weathers.forecast">
      Upcoming for 3 Days
    </h4>
    <v-flex
      row
      class="text-center justify-center mt-3"
      v-if="weathers.forecast"
    >
      <!-- Cards -->
      <v-col
        cols="6"
        md="3"
        v-for="(forecast, i) in weathers.forecast.forecastday"
        :key="i"
      >
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                new Date(forecast.date).toDateString()
              }}</v-list-item-subtitle>
              <v-img :src="forecast.day.condition.icon" contain />
              <v-list-item-subtitle>{{
                forecast.day.condition.text
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-flex>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ""
    };
  },
  computed: {
    weathers() {
      return this.$store.getters.weather;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    weatherIsEmpty() {
      return this.$store.getters.weatherIsEmpty;
    }
  },
  methods: {
    getWeatherData() {
      this.$store.dispatch("loadWeather", this.city);
    }
  }
};
</script>

<style scoped>
@media (max-width: 600px) {
  #searchButton {
    width: 100% !important;
  }
}
</style>
