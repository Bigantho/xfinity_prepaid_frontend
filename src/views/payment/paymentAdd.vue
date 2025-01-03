<template>
    <v-container>
        <h1 class="text-center">New Payment</h1>
        <br>
        <v-card class="pa-8">
            <v-row>
                <v-btn icon="mdi mdi-arrow-top-left-bold-box-outline" variant="text"
                    @click="$router.push({ name: 'paymentTotal' })">
                </v-btn>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-select label="Select order" variant="outlined" :items="formattedOrders" item-title="title"
                        item-value="id" v-model="orderSelected">
                    </v-select>
                </v-col>
                <v-col cols="6"> <v-text-field label="Amount" variant="outlined" v-model="paymentAmount">
                    </v-text-field> </v-col>
                <v-col cols="6"></v-col>

            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Trx ID" variant="outlined" v-model="paymentTrxId">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-checkbox label="Is refill payment?" v-model="isRefillPayment"></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center">
                    <v-btn prepend-icon="mdi mdi-content-save" base-color="#4D87E2" size="large" @click="savePayment">
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style scoped></style>

<script lang="js">
import { onMounted, ref, inject, computed } from 'vue'

export default {

    setup() {
        const orders = ref([])
        const $axios = inject('$axios')

        const orderSelected = ref(null)
        const paymentAmount = ref(null)
        const paymentTrxId = ref(null)
        const isRefillPayment = ref(null)

        const getOrders = async () => {
            await $axios.get('/order/total').then(res => {
                orders.value = res.data.data
            }).catch(err => {

            })
        }

        const formattedOrders = computed(() =>
            orders.value.map((e) => ({
                ...e,
                title: `${e.fullName} - ${e.account}`
            }))
        )

        const savePayment = async () => {

            const dataToSave = {
                orderId: orderSelected.value,
                amount: paymentAmount.value,
                trx_id: paymentTrxId.value,
                is_refill: isRefillPayment.value,

            }
            await $axios.post('/payment/create', dataToSave).then(res => {
                orders.value = res.data.data
            }).catch(err => {

            })
        }
        onMounted(() => {
            getOrders()
        })

        return {
            getOrders,
            orders,
            formattedOrders,
            savePayment,
            orderSelected,
            paymentTrxId,
            paymentAmount,
            isRefillPayment
        }
    }


}

</script>