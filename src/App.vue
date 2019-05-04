<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      fixed
      v-model="leftDrawer"
      :mini-variant="leftMiniVariant"
    >
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-action><v-icon>dashboard</v-icon></v-list-tile-action>
          <v-list-tile-content
            ><v-list-tile-title
              >ダッシュボード</v-list-tile-title
            ></v-list-tile-content
          >
        </v-list-tile>

        <v-list-tile to="/prefs">
          <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
          <v-list-tile-content
            ><v-list-tile-title>設定</v-list-tile-title></v-list-tile-content
          >
        </v-list-tile>

        <v-list-tile to="/about">
          <v-list-tile-action><v-icon>store</v-icon></v-list-tile-action>
          <v-list-tile-content
            ><v-list-tile-title
              >について</v-list-tile-title
            ></v-list-tile-content
          >
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app clipped-left clipped-right>
      <v-toolbar-side-icon
        @click.stop="leftDrawer = !leftDrawer"
      ></v-toolbar-side-icon>
      <v-btn icon @click.stop="leftMiniVariant = !leftMiniVariant">
        <v-icon
          v-html="leftMiniVariant ? 'chevron_right' : 'chevron_left'"
        ></v-icon>
      </v-btn>
      <v-toolbar-title>The Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{
        $store.state.user ? $store.state.user : "未ログイン"
      }}</v-toolbar-title>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content><router-view /></v-content>

    <v-navigation-drawer app clipped fixed v-model="rightDrawer" right>
      <v-list>
        <v-list-tile to="/login">
          <v-list-tile-action><v-icon>dashboard</v-icon></v-list-tile-action>
          <v-list-tile-content
            ><v-list-tile-title
              >ログアウト</v-list-tile-title
            ></v-list-tile-content
          >
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-footer app>
      <v-flex py-3 text-xs-center xs12>
        &copy;2019 — <strong>Vue_Appsync_App</strong>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      leftMiniVariant: false,
      leftDrawer: false,
      rightDrawer: false
    };
  }
};
</script>
