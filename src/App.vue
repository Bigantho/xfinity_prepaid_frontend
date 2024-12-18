<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <v-layout>
      <v-app-bar color="#5426D6" prominent>
        <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
        <v-toolbar-title class="text-center">

          <v-btn @click="$router.push({ name: 'dashboard' })">
            Xfinity Prepaid
          </v-btn>
        </v-toolbar-title>
        <br>

        <!-- <v-spacer></v-spacer> -->

        <!-- <v-btn icon="mdi-magnify" variant="text"></v-btn> -->
        <template v-if="$vuetify.display.mdAndUp">
          <!-- <v-toolbar-items> -->
          <!-- <v-btn variant="text" @click="$router.push({ name: 'message' })"> Enviar mensajes</v-btn> -->
          <!-- <p>|</p>
          <v-btn variant="text" @click="$router.push({ name: 'messageSent' })"> Mensajes enviados</v-btn>
          <p>|</p>
          <v-btn variant="text" @click="$router.push({ name: 'restrictedNumbers' })">Números restringidos</v-btn>
          <p>|</p>
          <v-btn variant="text" @click="$router.push({ name: 'logQueries' })">Bitacora</v-btn>
          <p>|</p> -->
          <v-btn append-icon="mdi mdi-logout" @click="logOut">Salir</v-btn>
          <!-- </v-toolbar-items> -->
        </template>

        <!-- <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
      </v-app-bar>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="avasquez@red5g.com"
            title="Anthony Vasquez"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi mdi-account-multiple" title="Customers" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi mdi-router-wireless" title="Routers" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi mdi-file-document-check-outline" title="Orders" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    
  </header>

  <main>
    <br>
    <br>
    <router-view />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
