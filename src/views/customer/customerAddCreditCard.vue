<template>
    <v-container>
        <v-row class="text-center" no-gutters>
            <v-col>
                <h1 class="text-center">Customer</h1>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-icon icon="mdi-arrow-top-left-bold-box-outline" @click="$router.go(-1)">
                </v-icon>
            </v-col>

        </v-row>
        <br>
        <v-card class="pa-8">
            <v-row>

                <v-col class="text-center">
                    <h2>Credit Card</h2>
                </v-col>
            </v-row>
            <br>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Number Card" v-model="cdtCardNumber">

                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="Card Holder" v-model="cdtCardHolder">

                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Expiration Date" v-model="cdtCardExpDate" placeholder="MMYYYY">

                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="CVV" v-model="cdtCardCVV">

                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-select label="Card Provider" :items="cardCreditTypes" v-model="cdtCardTypesSelected">

                    </v-select>
                </v-col>
                <v-col cols="6">
                    <!-- <v-text-field label="CVV">

                    </v-text-field> -->
                </v-col>
            </v-row>
            <br>
            <h2 class="xp-title-table">Billing Address</h2>
            <br>
            <v-row>
                <v-col cols="4">
                    <v-select label="State" :items="states" variant="outlined" v-model="billingStateSelected"></v-select>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="City" variant="outlined" v-model="billingCity"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Zipcode" variant="outlined" v-model="billingZipcode"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field label="Address Street 1" variant="outlined" v-model="billingAddress1"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Address Street 2" variant="outlined" v-model="billingAddress2"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-select label="Country" :items="['USA']" v-model="billingCountrySelected" disabled></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="text-center">
                    <v-btn color="primary" icon="mdi-content-save" @click="saveCreditCard" class="mr-3"></v-btn>
                    <v-btn color="primary" append-icon="mdi-arrow-right-thin"
                        @click="$router.push({ name: 'customerAddVirtualPhone' })" :disabled="disabledBtn">
                        NEXT
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style scoped></style>

<script lang="js">
import { ref, computed, inject } from 'vue'
import Swal from 'sweetalert2';

export default {

    setup() {
        const axios = inject('$axios')
        const disabledBtn = ref(true)
        const cardCreditTypes = ref(['VISA', 'Master Card', 'American Express'])
        const cdtCardNumber = ref("")
        const cdtCardHolder = ref("")
        const cdtCardExpDate = ref("")
        const cdtCardCVV = ref("")
        const cdtCardTypesSelected = ref("")

        const billingStateSelected = ref("")
        const billingCity = ref("")
        const billingZipcode = ref("")
        const billingAddress1 = ref("")
        const billingAddress2 = ref("")
        const billingCountrySelected = ref("USA")

        const saveCreditCard = async () => {
            const customerId = localStorage.getItem('customerId')

            const cdtCardObj = {
                number: cdtCardNumber.value,
                type: cdtCardTypesSelected.value,
                card_holder: cdtCardHolder.value,
                cvc: cdtCardCVV.value,
                exp_date: cdtCardExpDate.value,
                active: "1",
                is_deleted: "0",
                id_customer: customerId,
                billing_address_country: billingCountrySelected.value,
                billing_address_street: billingAddress1.value ,
                billing_address_street_2: billingAddress2.value,
                billing_address_house: "",
                billing_address_state:billingStateSelected.value ,
                billing_address_city:  billingCity.value,
                billign_address_zipcode:billingZipcode.value ,

            }

            await axios.post('/credit_card/create', cdtCardObj).then(res => {
                disabledBtn.value = false
                Swal.fire({
                    title: "Credit Card Added!",
                    text: res.data.msg,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'custom-text-color-confirm',
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



        return {

            saveCreditCard,

            disabledBtn,

            cardCreditTypes,
            cdtCardNumber,
            cdtCardHolder,
            cdtCardExpDate,
            cdtCardTypesSelected,
            cdtCardCVV,

            billingState,
            billingCity,
            billingZipcode,
            billingAddress1,
            billingAddress2,
            billingCountrySelected
        }
    }


}

</script>