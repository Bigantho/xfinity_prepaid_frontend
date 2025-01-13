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
                    <v-select label="Select Customer" :items="customersFormatted" item-title="title" item-value="id"
                        v-model="orderCustomerSeleted">
                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-select label="Select Router" :items="routersFormatted" item-title="title" item-value="id"
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

                    <!-- <v-text-field v-model="orderXfinityUser" label="Xfinity User"> -->
                    <!-- </v-text-field> -->

                    <v-select :items="orderShippingCarrier" v-model="orderShippingCarrierSelected" label="Currier">
                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="orderTrackingNum" label="Tracking Number">
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
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';


export default {
    setup() {
        const $axios = inject('$axios')
        const routers = ref([])
        const customers = ref([])

        const router = useRouter();


        const orderLabel = ref("")
        const orderXfinityUser = ref("")
        const orderXfinityPassword = ref("")
        const orderCustomerSeleted = ref("")
        const orderRouterSelected = ref("")
        const orderCorrelative = ref("")
        const orderTotal = ref(0)
        const orderShippingCarrier = ref(['UPS', 'FedEx', 'DHL'])
        const orderShippingCarrierSelected = ref("")
        const orderTrackingNum = ref("")
        const getRouters = async () => {
            await $axios.get('/router/total').then(res => {
                routers.value = res.data.data.filter((w) => w.hasOrder == false)
            }).catch(err => {

            })
        }

        const getCustomers = async () => {
            await $axios.get('/customer/total').then(res => {
                customers.value = res.data.data
            }).catch(err => {

            })
        }

        const getOrders = async () => {
            await $axios.get('/order/total').then(res => {
                orderTotal.value = res.data.data.length
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
                shipping_carrier: orderShippingCarrierSelected.value, 
                tracking_num: orderTrackingNum.value
            }
            await $axios.post('/order/place', data).then(res => {
                generateCorrelative()
                Swal.fire({
                    title: "Order placed!",
                    text: res.data.msg,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'custom-text-color-confirm',
                    }
                }).then((res) => {
                    if (res.isConfirmed) {
                        router.push({ name: 'orderTotal' })
                    }
                })
            }).catch(err => {
                Swal.fire({
                    title: "Something went wrong!",
                    text: err.response.data.msg,
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'custom-text-color-confirm',
                    }
                })
            })
        }
        const generateCorrelative = async () => {
            // const currentYear = new Date().getFullYear();
            // const randomFiveDigits = Math.floor(10000 + Math.random() * 90000); // Ensures a 5-digit number
            await getOrders();
            const correlativeNumber = (orderTotal.value + 1).toString().padStart(10, '0');
            // routerCorrelativeNum.value = correlativeNumber
            orderCorrelative.value = `CSXP-${correlativeNumber}`;
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

        const customersFormatted = computed(() =>             
            customers.value.map((e) => ({
                ...e,
                title: `${e.name} - ${e.email}`
            }))
        )

        const routersFormatted = computed(() =>             
        routers.value.map((e) => ({
                ...e,
                title: `${e.name} - ${e.serial}`
            }))
        )
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
            getOrders,
            orderTotal, 

            orderShippingCarrierSelected,
            orderShippingCarrier,
            orderTrackingNum,

            customersFormatted,
            routersFormatted

        }
    }

}

</script>