<template>
    <v-container>
        <v-card class="pa-8">
            <h1 class="text-center">MAKE PAYMENT</h1>
            <br>
            <v-row>
                <!-- <v-col cols="9"><v-select label="Select Order (Customer - Account - Router)" :items="ordersFormatted"
                        item-title="title" item-value="id" v-model="orderSelected"
                        @update:modelValue="getCreditCardData()" return-object></v-select></v-col> -->

                <v-col cols="12">
                    <v-select :items="typesPaymentsFormatted" item-title="title" item-value="id"
                        label="Amount to charged" v-model="typesPaymentsSelected" variant="outlined">

                    </v-select>

                    <!-- <v-text-field v-model="amountToChargedFormatted" label="Amount to charged" readonly></v-text-field> -->
                </v-col>
            </v-row>
            <v-row>
                <v-col> <v-text-field label="Card Holder" v-model="cardHolder" variant="outlined"></v-text-field></v-col>
                <v-col><v-text-field label="Card Number" v-model="cardNum" variant="outlined"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col><v-text-field label="Exp Date" v-model="cardExpDate" variant="outlined"></v-text-field></v-col>
                <v-col><v-text-field label="CVV" v-model="cardCVV" variant="outlined"></v-text-field></v-col>
                <v-col><v-select label="Brand" :items="cardTypes" item-title="name" item-value="value"
                        v-model="cardBrandSelected" variant="outlined"></v-select></v-col>

            </v-row>
            <v-row>
                <v-col class="text-center">
                    <v-btn variant="outlined" @click="makePayment()">
                        SAVE PAYMENT
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style scoped>
.custom-text-color-cancelled {
    color: white !important;
}
</style>

<script lang="js">
import { onMounted, ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';


export default {


    setup() {
        const $axios = inject('$axios')
        const router = useRouter();

        const orders = ref([])
        const orderSelected = ref("")
        const amountToCharged = ref("1")
        const cardHolder = ref("")
        const cardNum = ref("")
        const cardExpDate = ref("")
        const cardCVV = ref("")
        const cardBrandSelected = ref("")
        const cardTypes = ref([{ name: "VISA", value: "VISA" }, { name: "Master Card", value: "MC" }, { name: "American Express", value: "AMEX" }])
        const typesPayments = ref([])
        const typesPaymentsSelected = ref(3) // Por defecto el id:3 que es el bundle

        const getOrders = async () => {
            await $axios.get('/order/total').then(res => {
                orders.value = res.data.data
            }).catch(err => {

            })
        }

        const ordersFormatted = computed(() =>
            orders.value.map((e) => ({
                ...e,
                title: `${e.fullName} - ${e.account} - ${e.routerCorrelative}`
            }))
        )

        const typesPaymentsFormatted = computed(() =>
            typesPayments.value.map((e) => ({
                ...e,
                title: `${e.name} - $${e.amount}`
            }))
        );

        const makePayment = async () => {

            const paymentObj = {
                orderId: orderSelected.value.id,
                amount: amountToCharged.value,
                brand: cardBrandSelected.value,
                number: cardNum.value,
                exp_month: cardExpDate.value.slice(0, 2),
                exp_year: cardExpDate.value.slice(-4),
                cvv: cardCVV.value,
                id_type_payment: typesPaymentsSelected.value,
                card_holder: cardHolder.value,
            }

            Swal.fire({
                title: `¿Desea realizar el cobro de $${amountToCharged.value}?`,
                // text: `Transaction Id: ${res.data.paymentMade.id}`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
                cancelButtonColor: "#f44336",
                cancelButtonText: "Cancelled",
                customClass: {
                    confirmButton: 'custom-text-color-confirm',
                    cancelButton: 'custom-text-color-cancelled'
                }
            }).then(async (res) => {
                if (res.isConfirmed) {
                    // $router.push({ name: 'customerTotal' })

                    await $axios.post('/payment/make', paymentObj).then(res => {
                        // orders.value = res.data.data
                        Swal.fire({
                            title: `Cobro realizado exitosamente. `,
                            text: `Transaction Id: ${res.data.paymentMade.id}`,
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK",
                            customClass: {
                                confirmButton: 'custom-text-color-confirm',
                            }
                        })
                    }).catch(err => {

                        Swal.fire({
                            title: "Algo salio mal, contacte soporte tecnico.",
                            text: `Error: ${err.response.data.err}`,
                            icon: "error",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK",
                            customClass: {
                                confirmButton: 'custom-text-color-confirm',
                            }
                        })
                    })
                }
            });


        }

        const getCreditCardData = async () => {
            await $axios.get(`/credit_card/total/${orderSelected.value.customerID}`).then(res => {

                cardHolder.value = res.data.data[0].card_holder,
                    cardNum.value = res.data.data[0].number
                cardExpDate.value = res.data.data[0].exp_date,
                    cardCVV.value = res.data.data[0].cvc
                //  We use this switch cause the default values that clover uses are not the same that our
                switch (res.data.data[0].type) {
                    case "Master Card":
                        cardBrandSelected.value = "MC"
                        break;
                    case "American Express":
                        cardBrandSelected.value = "AMEX"
                        break;
                    case "VISA":
                        cardBrandSelected.value = "VISA"
                        break;

                    default:
                        break;
                }
            })
        }

        const getPaymentTypes = async () => {
            await $axios.get(`/payment/catalog`).then(res => {
                typesPayments.value = res.data.data
            })
        }

        onMounted(() => {
            getOrders()
            getPaymentTypes()
        })

        return {
            getOrders,
            orders,
            ordersFormatted,
            orderSelected,
            amountToCharged,
            typesPaymentsFormatted,
            cardHolder,
            cardNum,
            cardExpDate,
            cardCVV,
            cardBrandSelected,
            makePayment,
            cardTypes,
            getCreditCardData,
            typesPayments,
            getPaymentTypes,
            typesPaymentsSelected
        }



    }
}
</script>