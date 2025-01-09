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
                <v-col cols="6"> 
                    <v-select :items="paymentTypeFormatted" v-model="paymentTypeSelected" item-title="title" item-value="id" variant="outlined" label="Payment type">
                    </v-select>
                 </v-col>
                <v-col cols="6"></v-col>

            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Trx ID" variant="outlined" v-model="paymentTrxId">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                  

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
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {

    setup() {
        const orders = ref([])
        const $axios = inject('$axios')

        const orderSelected = ref(null)
        const paymentType = ref([])
        const paymentTypeSelected = ref(null)
        const paymentTrxId = ref(null)
        
        const router = useRouter();


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


        const paymentTypeFormatted = computed(() =>
            paymentType.value.map((e) => ({
                ...e,
                title: `${e.name} - $${e.amount}`
            }))
    )
        const savePayment = async () => {

            const dataToSave = {
                orderId: orderSelected.value,
                trx_id: paymentTrxId.value,
                id_type_payments: paymentTypeSelected.value

            }
            await $axios.post('/payment/create', dataToSave).then(res => {
                orders.value = res.data.data
                Swal.fire({
                    title: "Payment Created",
                    text: res.data.msg,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'custom-text-color-confirm',
                    }
                }).then((res)=>{
                    if (res.isConfirmed) {
                        router.push({ name: 'paymentTotal' })

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

        const getPaymentsType = async() => {
            await $axios.get('/payment/catalog').then(res => {
                paymentType.value = res.data.data
            }).catch(err => {

            })
        }

        onMounted(() => {
            getOrders()
            getPaymentsType()
        })

        return {
            getOrders,
            orders,
            formattedOrders,
            savePayment,
            orderSelected,
            paymentTrxId,
            getPaymentsType, 
            paymentType, 
            paymentTypeSelected,
            paymentTypeFormatted
        }
    }


}

</script>