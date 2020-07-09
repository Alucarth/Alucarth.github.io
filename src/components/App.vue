<template>
  <v-app id="inspire">
    <v-app id="inspire">

      <v-main>
        <v-container
          class="fill-height"
          fluid
        >
          <!-- <v-row
            align="center"
            justify="center"
          >
            <v-col cols="4" class="blue">
              menu
            </v-col>
            <v-col cols="8" class="red">
              contenido
            </v-col>
          </v-row> -->
          <v-card
              elevation="12"
              width="20%"
              flat
            >
            <v-navigation-drawer
              floating
              permanent
            >
              <v-list
                dense
                rounded
              >
                <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  link
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
          <v-divider></v-divider>
          <v-card color="blue" width="77%">
            contenido
          </v-card>

        </v-container>
      </v-main>

      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </v-app>
</template>
<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
    drawer: null,
  }),

};
</script>
