<template>
    <v-container>
        <v-card class="pa-10">
            <v-row>
                <v-col cols="6">
                    <v-btn icon="mdi mdi-arrow-top-left-bold-box-outline" variant="text"
                        @click="$router.push({ name: 'orderTotal' })">
                    </v-btn>
                </v-col>
                <v-col cols="1" offset="2" class="text-right">
                    <VueToPrint :content="labelRef" document-title="AwesomeFileName" remove-after-print>
                        <template #trigger>
                            <v-btn icon="mdi mdi-printer-outline" variant="outlined" :disabled="showBtnPrint">
                            </v-btn>
                        </template>
                    </VueToPrint>
                </v-col>
                <v-col cols="3" class="text-end">
                    <v-text-field label="Correlative" v-model="routerCorrelative" readonly>
                    </v-text-field>
                </v-col>
            </v-row>


            <v-row class="text-center">
                <v-col cols="6">
                    <v-select label="Select Customer" :items="customersFormatted" item-title="title" item-value="id"
                        v-model="orderCustomerSeleted" variant="outlined" return-object>
                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete label="Select Router" :items="routersFormatted" variant="outlined"
                        v-model="orderRouterSelected" item-title="title" item-value="id" return-object></v-autocomplete>

                    <!-- <v-select label="Select Router" :items="routersFormatted" variant="outlined" item-title="title"
                        item-value="id" v-model="orderRouterSelected" return-object>
                    </v-select> -->
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="6">

                    <v-text-field v-model="orderXfinityUser" variant="outlined" label="Xfinity User">

                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="orderXfinityPassword" variant="outlined" label="Password Xfinity">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="6">

                    <!-- <v-text-field v-model="orderXfinityUser" label="Xfinity User"> -->
                    <!-- </v-text-field> -->

                    <v-select :items="orderShippingCarrier" v-model="orderShippingCarrierSelected" label="Currier"
                        variant="outlined">
                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="orderTrackingNum" label="Tracking Number" variant="outlined">
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
                            <v-date-picker v-model="refillDate" :min="today"></v-date-picker>
                        </v-card>
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <v-checkbox label="Use same customer address" @change="copyAddress()"
                        v-model="sameAddress"></v-checkbox>
                </v-col>
            </v-row>
            <h2 class="xp-title-table">Activation Address</h2>
            <br>
            <v-row>
                <v-col cols="4">
                    <v-text-field label="Address Street 1" variant="outlined"
                        v-model="activationAddress1"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Address Street 2" variant="outlined"
                        v-model="activationAddress2"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="City" variant="outlined" v-model="activationCity"></v-text-field>
                </v-col>



            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field label="Zipcode" variant="outlined" v-model="activationZipcode"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-select label="State" :items="states" variant="outlined" v-model="activationState"></v-select>
                </v-col>
                <v-col cols="4">
                    <v-select label="Country" :items="['USA']" v-model="activationCountrySelected" disabled></v-select>
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


<style scoped>
@media screen {
    .hide-printable-label {
        display: none;
    }
}

@media print {
    .hide-printable-label {
        display: block !important;
    }
}
</style>

<script>
import { ref, inject, onMounted, computed, watch } from 'vue'
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import orderPrintLabel from '@/views/order/orderPrintLabel.vue'
import { VueToPrint } from 'vue-to-print';
import html2canvas from "html2canvas";

export default {

    components: {
        // orderPrintLabel,
        VueToPrint
    },
    setup() {
        const labelRef = ref()
        const showBtnPrint = ref(true)
        const $axios = inject('$axios')
        const routers = ref([])
        const customers = ref([])
        const router = useRouter();
        const captureElement = ref(null);


        const orderLabel = ref("")
        const orderXfinityUser = ref("")
        const orderXfinityPassword = ref("")
        const orderCustomerSeleted = ref("")
        const orderRouterSelected = ref("")
        const orderCorrelative = ref("")
        const orderTotal = ref(0)
        const orderShippingCarrier = ref(['UPS', 'FedEx', 'DHL', 'USPS'])
        const orderShippingCarrierSelected = ref("")
        const orderTrackingNum = ref("")

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
        const activationState = ref("")
        const activationCity = ref("")
        const activationZipcode = ref("")
        const activationAddress1 = ref("")
        const activationAddress2 = ref("")
        const activationCountrySelected = ref("USA")
        const sameAddress = ref(false)
        const today = computed(() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow.toISOString().split('T')[0];
        })

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
                id_customer: orderCustomerSeleted.value.id,
                id_router: orderRouterSelected.value.id,
                id_status_order: 1, // Por default 1 que es "Created"
                xfinity_user: orderXfinityUser.value,
                xfinity_password: orderXfinityPassword.value,
                account: orderCorrelative.value,
                refill_payment_date: refillDate.value,
                shipping_carrier: orderShippingCarrierSelected.value,
                tracking_num: orderTrackingNum.value,
                activation_address_state: activationState.value,
                activation_address_city: activationCity.value,
                activation_address_zipcode: activationZipcode.value,
                activation_address_street: activationAddress1.value,
                activation_address_street_2: activationAddress2.value,
                activation_address_country: activationCountrySelected.value,
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

        const routerCorrelative = computed(() => {
            return orderRouterSelected.value.correlative
        })

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

        const openWindow = async () => {
            const url = router.resolve({ name: 'orderPrintLabel', params: { id_router: orderRouterSelected.value.correlative } }).href
            window.open(url, '_blank')
        }

        const generateImagen = async () => {

            if (captureElement.value) {
                console.log("entroooooo", captureElement.value);
                const canvas = await html2canvas(captureElement.value);
                const imgData = canvas.toDataURL("image/png");

                // Crear una nueva ventana con la imagen y llamar a imprimir
                const printWindow = window.open("", "_blank");
                printWindow.document.write(`
                                <html>
                                    <head>
                                    <title>Imprimir Imagen</title>
                                    </head>
                                    <body>
                                    <img src="${imgData}" style="width:100%;" />
                                    <script>
                                        window.onload = function() {
                                        window.print();
                                        window.onafterprint = function() { window.close(); }
                                        }
                                    <\/script>
                                    </body>
                                </html>
                                `);
                printWindow.document.close();
            }
        }

        const copyAddress = () => {
            if (sameAddress.value) {
                activationAddress1.value = orderCustomerSeleted.value.address_object.address_street
                activationAddress2.value = orderCustomerSeleted.value.address_object.address_street_2
                activationCity.value = orderCustomerSeleted.value.address_object.address_city
                activationZipcode.value = orderCustomerSeleted.value.address_object.address_zipcode
                activationState.value = orderCustomerSeleted.value.address_object.address_state
            } else {
                activationAddress1.value = ""
                activationAddress2.value = ""
                activationCity.value = ""
                activationZipcode.value = ""
                activationState.value = ""
            }
        }

        watch(orderRouterSelected, () => {
            if (orderRouterSelected != null) {
                // showBtnPrint.value = false
                //  #### SE DEJA EN TRUE PARA QUE NO SE PUEDA usar el btn , pero de deja la logica para reciclarlo despues
                showBtnPrint.value = true

            }
        })
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


            activationState,
            activationCity,
            activationZipcode,
            activationAddress1,
            activationAddress2,
            activationCountrySelected,
            states,
            routersFormatted,

            routerCorrelative,

            openWindow,

            labelRef,
            showBtnPrint,

            generateImagen,
            captureElement,

            copyAddress,
            sameAddress,
            today


        }
    }

}

</script>