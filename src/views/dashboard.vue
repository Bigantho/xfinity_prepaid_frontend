<template>
    <v-container>
        <!-- <v-card class=""> -->
        <v-row class="ma-1">
            <v-col cols="4">
                <v-btn variant="text" color="" base-color="red" @click="$router.push({ name: 'customer' })">
                    <v-icon color="#4D87E2" class="me-1">mdi mdi-account-multiple</v-icon> Customer
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn variant="text" color="" base-color="red" @click="$router.push({ name: 'router' })">
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
                <v-card>
                    <v-data-table :headers="headers" :items="boats" height="250" item-value="name"
                        hide-default-footer></v-data-table>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-data-table :headers="headers" :items="boats" height="250" item-value="name"
                        hide-default-footer></v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-data-table :headers="headers" :items="boats" height="250" item-value="name"
                        hide-default-footer></v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="js">
import { ref } from 'vue'
export default {
    setup() {
        const n = ref('Anthony Vasquez')
        const headers = ref([
            { title: 'Account', align: 'center', key: 'account' },
            { title: 'Full Name', align: 'center', key: 'name' },
            { title: 'Billing', align: 'center', key: 'billing' }
        ])

        const boats = ref([
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


        return {
            headers,
            boats
        }
    }
}
</script>