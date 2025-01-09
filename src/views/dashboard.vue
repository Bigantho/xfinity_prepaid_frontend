<template>
    <v-container>
        <!-- <v-card class=""> -->
        <v-row class="text-center">
            <v-col cols="4">
                <v-btn variant="text" color="" base-color="red" @click="$router.push({ name: 'customerTotal' })">
                    <v-icon color="#4D87E2" class="me-1">mdi mdi-account-multiple</v-icon> Customer
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn variant="text" color="" base-color="red" @click="$router.push({ name: 'routerTotal' })">
                    <v-icon color="#4D87E2" class="me-1">mdi mdi-router-wireless</v-icon> Routers
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn variant="text" color="" base-color="red" @click="$router.push({ name: 'orderPlace' })">
                    <v-icon color="#4D87E2" class="me-1">mdi mdi-file-document-check-outline</v-icon> Place Order
                </v-btn>
            </v-col>
        </v-row>
        <!-- </v-card> -->
        <br>
        <v-row>
            <v-col cols="6">
                <h3 class="xp-title-table">Payments</h3>
                <br>
                <v-card>
                    <v-data-table :headers="headersPayments" :items="payments" height="200" item-value="name"
                        hide-default-footer>
                        <template v-slot:item.amount="{ item }">
                            {{ `$${item.amount}` }}
                        </template>
                        <template v-slot:item.chargedAt="{ item }">
                            {{ proxy.$globalMethods.convertToUTC6(item.chargedAt) }}
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="6">
                <h3 class="xp-title-table">Orders</h3>
                <br>
                <v-card>
                    <v-row class="ma-6" no-gutters>
                        <v-col cols="6">
                            <v-card style="background-color: #4D87E224;" height="150px" class="mr-3">
                                <v-card-title class="xp-card-title">0</v-card-title>
                                <v-card-text class="xp-card-text">Shipped Routers</v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card style="background-color: #51ECEC24;" height="150px" class="ml-3">
                                <v-card-title class="xp-card-title">0</v-card-title>
                                <v-card-text class="xp-card-text">Active Customer</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h3 class="xp-title-table">Routers</h3>
                <br>
                <v-card>
                    <v-data-table :headers="headersRoutes" :items="routes" height="250" item-value="name"
                        hide-default-footer>
                        <template v-slot:item.shipped="{ item }">
                            <v-chip variant="tonal" color="#447845" rounded>
                                {{ item.statusShipment ? 'Enviado' : 'No enviado' }}
                            </v-chip>
                        </template>

                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.xp-title-table {
    font-weight: 500;
}

.xp-card-title {
    text-align: center;
    font-size: 3.5em;
    color: #5426D6;
}

.xp-card-text {
    text-align: center;
    font-size: 1.5em;
    color: #5426D6;

}
</style>


<script lang="js">
import { ref, inject, onMounted, getCurrentInstance } from 'vue'
export default {
    setup() {
        const $axios = inject('$axios')
        const { proxy } = getCurrentInstance(); // Access `this` equivalent

        const headersPayments = ref([
            { title: 'Account', align: 'center', key: 'account' },
            { title: 'Customer', align: 'center', key: 'customer' },
            { title: 'Amount', align: 'center', key: 'amount' },
            { title: 'Charged At', align: 'center', key: 'chargedAt' },

        ])

        const headersRoutes = ref([
            { title: '#', align: 'center', key: 'position' },
            { title: 'Account', align: 'center', key: 'account' },
            { title: 'Brand', align: 'center', key: 'brand' },
            { title: 'Router', align: 'center', key: 'routerCorrelative' },
            { title: 'Shipment', align: 'center', key: 'shipped' },



        ])
        const payments = ref([])
        const routes = ref([])

        const getRouter = async () => {
            await $axios.get('/router/shipped').then(res => {
                routes.value = res.data.data
            }).catch(err => {

            })
        }

        const getPayments = async () => {
            // let td = '2025-01-03T18:35:43.000Z'
            // const isTokenExpired = proxy.$globalMethods.convertToUTC6(td, false)
            // console.log(isTokenExpired);

            await $axios.get('/payment/total').then(res => {
                payments.value = res.data.data
            }).catch(err => {

            })
        }

        onMounted(() => {
            getRouter()
            getPayments()
        })

        return {
            headersPayments,
            payments,
            headersRoutes,
            routes,

            getRouter,
            getPayments,
            proxy
        }
    }
}
</script>