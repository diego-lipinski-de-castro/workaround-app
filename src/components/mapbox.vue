<template>
  <div id="mapbox" ref="mapbox"></div>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "mapbox",
  data() {
    return {
      map: null
    };
  },
  computed: {
    ...mapGetters("app", ["mapboxTheme"]),
    ...mapGetters("context", ["currentPosition"])
  },
  watch: {
    currentPosition(n) {
      if (n) {
        this.map.flyTo({ center: [n.longitude, n.latitude], zoom: 14 });

        new mapboxgl.Marker()
          .setLngLat([n.longitude, n.latitude])
          .addTo(this.map);
      }
    }
  },
  methods: {
    ...mapActions("app", ["setTheme"]),
    ...mapActions("context", ["setPermission", "setPosition"]),
    setupMapBox() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZGMtbGlwaW5za2kiLCJhIjoiY2s3YWl6aXc5MTRrdDNtcDdtbW16a3gwMSJ9.5nDnmLr1u60FqPHS8sDIyQ";

      const map = new mapboxgl.Map({
        container: "mapbox",
        style: `mapbox://styles/mapbox/${this.mapboxTheme}`,
        center: [-53.8778066306, -19.9872399256],
        // maxBounds: [
        // [-73.9872354804, -33.7683777809],
        // [-34.7299934555, 5.24448639569]
        // ]
        zoom: 3
      });

      // `mapbox://styles/mapbox/dark-v10`;

      map.on("load", () => {
        map.setLayoutProperty("country-label", "text-field", [
          "get",
          "name_pt"
        ]);

        // map.addLayer({
        //   id: "countries",
        //   source: {
        //     type: "vector",
        //     url: "mapbox://byfrost-articles.74qv0xp0"
        //   },
        //   "source-layer": "ne_10m_admin_0_countries-76t9ly",
        //   type: "fill",
        //   paint: {
        //     "fill-color": "#52489C",
        //     "fill-outline-color": "#F2F2F2"
        //   }
        // });

        // map.setFilter("countries", ["in", "ADM0_A3_IS"].concat(["BRA"])); // This line lets us filter by country codes.
      });

      this.map = map;
    }
  },
  mounted() {
    this.setPermission().then(hasPermission => {
      if (hasPermission) {
        this.setPosition();
      }
    });

    this.setupMapBox();
  }
};
</script>

<style lang="stylus">
#mapbox
  position absolute
  height 100vh
  width 100vw
  z-index 1
</style>
