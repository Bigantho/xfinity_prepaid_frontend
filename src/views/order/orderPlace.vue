<template>
    <v-container>
        <v-card class="pa-10">
            <v-row>
                <v-col cols="6">
                    <v-btn icon="mdi mdi-arrow-top-left-bold-box-outline" variant="text"
                        @click="$router.push({ name: 'orderTotal' })">
                    </v-btn>
                </v-col>
                <v-col cols="3" offset="3" class="text-end">
                    <v-text-field label="Correlative" v-model="orderCorrelative" readonly>
                    </v-text-field>
                </v-col>
            </v-row>


            <v-row class="text-center">
                <v-col cols="6">
                    <v-select label="Select Customer" :items="customers" item-title="name" item-value="id"
                        v-model="orderCustomerSeleted">
                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-select label="Select Router" :items="routers" item-title="name" item-value="id"
                        v-model="orderRouterSelected">
                    </v-select>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="6">

                    <v-text-field v-model="orderXfinityUser" label="Xfinity User">

                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="orderXfinityPassword" label="Password Xfinity">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="6">
                    <v-menu v-model="menu" :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                            <v-text-field append-inner-icon="mdi mdi-calendar" label="Refill Payment Date"
                                v-bind="props" v-model="formattedRange" variant="outlined"></v-text-field>
                        </template>
                        <v-card min-width="300">
                            <v-date-picker v-model="refillDate"></v-date-picker>
                        </v-card>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="12" class="text-center">
                    <v-btn prepend-icon="mdi-content-save" color="primary" @click="saveOrder">
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>


<style scoped></style>

<script>
import { ref, inject, onMounted, computed } from 'vue'


export default {
    setup() {
        const $axios = inject('$axios')
        const routers = ref([])
        const customers = ref([])

        const orderLabel = ref("")
        const orderXfinityUser = ref("")
        const orderXfinityPassword = ref("")
        const orderCustomerSeleted = ref("")
        const orderRouterSelected = ref("")
        const orderCorrelative = ref("")

        const getRouters = async () => {
            await $axios.get('/router/total').then(res => {
                routers.value = res.data.data
            }).catch(err => {

            })
        }

        const getCustomers = async () => {
            await $axios.get('/customer/total').then(res => {
                customers.value = res.data.data
            }).catch(err => {

            })
        }

        const saveOrder = async () => {
            const data = {
                id_customer: orderCustomerSeleted.value,
                id_router: orderRouterSelected.value,
                xfinity_user: orderXfinityUser.value,
                xfinity_password: orderXfinityPassword.value,
                account: orderCorrelative.value,
                refill_payment_date: refillDate.value,
            }
            await $axios.post('/order/place', data).then(res => {

            }).catch(err => {

            })
        }
        const generateCorrelative = () => {
            const currentYear = new Date().getFullYear();
            const randomFiveDigits = Math.floor(10000 + Math.random() * 90000); // Ensures a 5-digit number
            orderCorrelative.value = `CSXP${currentYear}${randomFiveDigits}`;
        }

        const menu = ref(false)
        const refillDate = ref(null)
        // Computed property to format the date range for display
        const formattedRange = computed(() => {
            let date = refillDate.value;
            if (date != null) {
                date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                menu.value = false
                return date
            }
            return '';
        });


        onMounted(() => {
            getRouters()
            getCustomers()
            generateCorrelative()
        })

        return {
            getRouters,
            getCustomers,
            saveOrder,
            generateCorrelative,


            routers,
            customers,
            orderLabel,
            orderXfinityUser,
            orderXfinityPassword,
            orderCustomerSeleted,
            orderRouterSelected,
            orderCorrelative,

            menu,
            refillDate,
            formattedRange,

        }
    }

}

</script>