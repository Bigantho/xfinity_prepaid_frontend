<template>
    <v-container>

        <h1 class="text-center">Orders</h1>
        <br>
        <v-row>
            <v-col cols="3">
                <v-btn prepend-icon="mdi mdi-plus-circle" base-color="#4D87E2"
                    @click="$router.push({ name: 'orderPlace' })">
                    Place Order
                </v-btn>
            </v-col>
            <v-col cols="3" offset="1">
                <v-menu v-model="menu" :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <v-text-field append-inner-icon="mdi mdi-calendar" label="Creation Date" v-bind="props"
                            v-model="formattedRange" variant="outlined" disabled></v-text-field>
                    </template>
                    <v-card min-width="300">
                        <v-date-picker v-model="dateSelected"></v-date-picker>
                    </v-card>
                </v-menu>
            </v-col>
            <v-col cols="3"> <v-select :items="states" label="State" disabled></v-select> </v-col>
            <v-col cols="2">
                <v-btn append-icon="mdi mdi-download" variant="outlined" base-color="green" disabled>
                    Excel
                </v-btn>
            </v-col>
        </v-row>
        <br>
        <v-card>
            <v-data-table :headers="headersOrders" :items="orders" height="450" item-value="name">
                <template v-slot:item.actions="{ item }">
                    <v-btn icon="mdi-delete" variant="text" @click="dltOrder(item.id)" color="red">
                    </v-btn>
                </template>
                <template v-slot:item.refillDate="{ item }">
                    {{ proxy.$globalMethods.convertToUTC6(item.refillDate) }}
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script lang="js">
import { ref, computed, onMounted, inject, getCurrentInstance } from "vue"
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {

    setup() {
        const axios = inject('$axios')
        const { proxy } = getCurrentInstance()
        const router = useRouter();

        const states = ref([
            "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
            "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
            "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
            "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
            "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
            "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ])

        const menu = ref(false)
        const dateSelected = ref(null)
        // Computed property to format the date range for display
        const formattedRange = computed(() => {
            let date = dateSelected.value;

            if (date != null) {
                date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                menu.value = false
                return date
            }

            return '';
        });

        const headersOrders = ref([
            { title: '#', align: 'center', key: 'position' },
            { title: 'Account', align: 'center', key: 'account' },
            { title: 'Full Name', align: 'center', key: 'fullName' },
            { title: 'Phone Assigned', align: 'center', key: 'virtualPhone' },
            { title: 'Xfinity User', align: 'center', key: 'xfinityUser' },
            { title: 'Xfinity Password', align: 'center', key: 'xfinityPassword' },
            { title: 'Refill Date', align: 'center', key: 'refillDate' },
            { title: 'Tracking Number', align: 'center', key: 'trackingNum' },
            { title: 'Shipment Status', align: 'center', key: 'shipmentStatus' },
            { title: 'Actions', align: 'center', key: 'actions' },

        ])

        const orders = ref([])

        const getTotalOrder = async () => {
            await axios.get('/order/total').then(res => {
                orders.value = res.data.data
            }).catch(err => {

            })
        }
        const dltOrder = async (orderId) => {
            await axios.put(`/order/${orderId}/delete`).then(res => {

                Swal.fire({
                    title: "Order deleted",
                    text: res.data.msg,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'custom-text-color-confirm',
                    }
                }).then((res) => {
                    if (res.isConfirmed) {
                        getTotalOrder()
                    }
                })
            }).catch(err => {

            })
        }


        onMounted(() => {
            getTotalOrder()
        })

        return {
            states,

            menu,
            dateSelected,
            formattedRange,
            headersOrders,
            orders,

            onMounted,
            getTotalOrder,

            proxy,
            dltOrder
        }
    }
}

</script>