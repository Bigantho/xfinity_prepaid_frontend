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
                <v-btn variant="text" color="" base-color="red" @click="$router.push({ name: 'order' })">
                    <v-icon color="#4D87E2" class="me-1">mdi mdi-file-document-check-outline</v-icon> Orders
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
                        hide-default-footer></v-data-table>
                </v-card>
            </v-col>
            <v-col cols="6">
                <h3 class="xp-title-table">Orders</h3>
           <br>
                <v-card>
                    <v-row class="ma-6" no-gutters>
                        <v-col cols="6">
                            <v-card style="background-color: #4D87E224;" height="150px" class="mr-3">
                                <v-card-title class="xp-card-title">2</v-card-title>
                                <v-card-text class="xp-card-text">Shipped Routers</v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card style="background-color: #51ECEC24;" height="150px" class="ml-3">
                                <v-card-title class="xp-card-title">1</v-card-title>
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
                        <template v-slot:item.statusShipment="{ item }">
                            <v-chip variant="tonal"  color="#447845" rounded>
                             {{ item.statusShipment }}
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
import { ref } from 'vue'
export default {
    setup() {
        const n = ref('Anthony Vasquez')
        const headersPayments = ref([
            { title: 'Account', align: 'center', key: 'account' },
            { title: 'Full Name', align: 'center', key: 'name' },
            { title: 'Billing', align: 'center', key: 'billing' }
        ])

        const headersRoutes = ref([
            { title: 'Id', align: 'center', key: 'number' },
            { title: 'Order number', align: 'center', key: 'orderNumber' },
            { title: 'Creation date', align: 'center', key: 'creationDate' },
            { title: 'Brand', align: 'center', key: 'brand' },
            { title: 'Router', align: 'center', key: 'router' },
            { title: 'Shipment', align: 'center', key: 'statusShipment' },



        ])
        const payments = ref([
            {
                account: 'AV898989',
                name: "Anthony Vasquez",
                billing: true
            },
            {
                account: 'AV898989',
                name: "Anthony Vasquez",
                billing: true
            },
            {
                account: 'AV898989',
                name: "Anthony Vasquez",
                billing: true
            },
            {
                account: 'AV898989',
                name: "Anthony Vasquez",
                billing: true
            },
            {
                account: 'AV898989',
                name: "Anthony Vasquez",
                billing: true
            },
            {
                account: 'AV898989',
                name: "Anthony Vasquez",
                billing: true
            }
        ])

        const routes = ref([
            {
                number: "1",
                orderNumber: "34512345124123",
                creationDate: "15/09/2024",
                brand: "Xfinity",
                router: "OO:A3:F1:31:K1:HU",
                statusShipment: "ENVIADO"

            },
            {
                number: "1",
                orderNumber: "34512345124123",
                creationDate: "15/09/2024",
                brand: "Xfinity",
                router: "OO:A3:F1:31:K1:HU",
                statusShipment: "ENVIADO"

            },
            {
                number: "1",
                orderNumber: "34512345124123",
                creationDate: "15/09/2024",
                brand: "Xfinity",
                router: "OO:A3:F1:31:K1:HU",
                statusShipment: "ENVIADO"

            },
            {
                number: "1",
                orderNumber: "34512345124123",
                creationDate: "15/09/2024",
                brand: "Xfinity",
                router: "OO:A3:F1:31:K1:HU",
                statusShipment: "ENVIADO"

            },
            {
                number: "1",
                orderNumber: "34512345124123",
                creationDate: "15/09/2024",
                brand: "Xfinity",
                router: "OO:A3:F1:31:K1:HU",
                statusShipment: "ENVIADO"

            }

        ])

        return {
            headersPayments,
            payments,
            headersRoutes,
            routes
        }
    }
}
</script>