<template>
  <header v-if="!$route.meta.hideHeader">
    <v-layout>
      <v-app-bar color="#5426D6" prominent>
        <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
        <v-toolbar-title class="text-center">

          <v-btn @click="$router.push({ name: 'dashboard' })">
            <v-img src="/Logo-XfinityPrepaidWhiteHorizontal.svg" width="100" height="45" </v-img>
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
          <v-list-item prepend-icon="mdi mdi-account-tie" subtitle="avasquez@red5g.com"
            title="Anthony Vasquez"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-group value="customers">


            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi mdi-account-multiple" title="Customers"
                value="myfiles"></v-list-item>

            </template>
            <v-list-item prepend-icon="mdi mdi-plus" title="Add Customer" value="1"
              @click="$router.push({ name: 'customerAdd' })">

            </v-list-item>

            <v-list-item prepend-icon="mdi mdi-account-group" title="Customers" value="8"
              @click="$router.push({ name: 'customerTotal' })">

            </v-list-item>


            <v-list-item prepend-icon="mdi mdi-clipboard-text-clock-outline" title="Payment History" value="2"
              @click="$router.push({ name: 'customerPaymentHistory' })">

            </v-list-item>


            <!-- <v-list-item prepend-icon="mdi mdi-plus" title="Edit Customer" value="3"
              @click="$router.push({ name: 'customerEdit' })">

            </v-list-item> -->

          </v-list-group>

          <v-list-group value="routers">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi mdi-router-wireless" title="Routers"
                value="shared"></v-list-item>
            </template>
            <v-list-item prepend-icon="mdi mdi-plus" title="Add Router" value="4"
              @click="$router.push({ name: 'routerAdd' })">
            </v-list-item>
            <v-list-item prepend-icon="mdi mdi-format-list-bulleted" title="Routers" value="5"
              @click="$router.push({ name: 'routerTotal' })">
            </v-list-item>
          </v-list-group>

          <v-list-group value="orders">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi mdi-file-document-check-outline" title="Orders"
                value="starred"></v-list-item>
            </template>
            <v-list-item prepend-icon="mdi mdi-plus" title="Place Order" value="6"
              @click="$router.push({ name: 'orderPlace' })"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-format-list-bulleted" title="List Order" value="7"
              @click="$router.push({ name: 'orderTotal' })">
            </v-list-item>
          </v-list-group>

          <v-list-group value="payment">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi mdi-account-credit-card-outline" title="Payments"
                value="starred"></v-list-item>
            </template>
            <v-list-item prepend-icon="mdi mdi-plus" title="Add Payment" value="9"
              @click="$router.push({ name: 'paymentAdd' })"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-format-list-bulleted" title="Payments" value="10"
              @click="$router.push({ name: 'paymentTotal' })"></v-list-item>
          </v-list-group>


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

<script lang="js">
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();

    const logOut = () => {
      router.push({ name: 'login' })
    }
    const userId = "1"

    const openWindow = async () => {
      const url = router.resolve({ name: 'orderPrintLabel', params: { id_router: userId } }).href
      window.open(url, '_blank')
    }


    return {

      logOut,
      openWindow
    }
  }
}
</script>