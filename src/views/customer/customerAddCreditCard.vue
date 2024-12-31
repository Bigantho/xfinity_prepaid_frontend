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
                    <v-text-field label="Expiration Date" v-model="cdtCardExpDate">

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
            <!-- <v-row>
                <v-col class="text-center">
                    <v-btn prepend-icon="mdi mdi-content-save" base-color="#4D87E2" size="large">
                        Save
                    </v-btn>
                </v-col>
            </v-row> -->

            <br>
            <h2>Choose Service</h2>
            <v-row>
                <v-col cols="4">
                    <v-select v-model="servicesSelected" :items="formattedServices" item-title="title" item-value="id">
                        <!-- <template #item="{ item }">
                            america
                            {{ item.name }} - {{ item.price }}
                        </template> -->
                    </v-select>
                </v-col>
                <v-col cols="3">
                    <v-checkbox label="Activation Fee"></v-checkbox>
                </v-col>
                <v-col cols="3">
                    <v-checkbox label="Equipment Charge"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox label="Installation"></v-checkbox>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="3"></v-col>
                <v-col><v-row>
                        <v-col class="text-start"> <strong>Service</strong> <br> Shipment <br> Activation Fee</v-col>
                        <v-col class="text-end"> <strong>Total</strong> <br> $100.00 <br> $20.00 </v-col>
                        <v-divider color="#000000"></v-divider>
                    </v-row>
                    <v-row>
                        <v-col class="text-start"> <strong>Total</strong></v-col>
                        <v-col class="text-end"> $120.00</v-col>
                    </v-row>
                </v-col>
                <v-col cols="3"></v-col>
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
export default {

    setup() {
        const axios = inject('$axios')
        const disabledBtn = ref(true)
        const cardCreditTypes = ref(['VISA', 'Master Card', 'American Express'])
        const cdtCardNumber = ref("4845898956562525")
        const cdtCardHolder = ref("Anthony Vasquez")
        const cdtCardExpDate = ref("052565")
        const cdtCardCVV = ref("999")
        const cdtCardTypesSelected = ref("VISA")

        const servicesSelected = ref(null)
        const services = ref([
            {
                id: "1",
                name: "Installation",
                price: "$99.99"
            },
            {
                id: "2",
                name: "Services",
                price: "$50"
            },
            {
                id: "3",
                name: "Services 2",
                price: "$50"
            }
        ])


        // Create a computed property to format the services for display
        const formattedServices = computed(() =>
            services.value.map((service) => ({
                ...service,
                title: `${service.name} - ${service.price}`, // Combine name and price in the title
            }))
        );

        const saveCreditCard = async () => {

            const cdtCardObj = {
                number: cdtCardNumber.value,
                type: cdtCardTypesSelected.value,
                card_holder: cdtCardHolder.value,
                cvc: cdtCardCVV.value,
                exp_date: cdtCardExpDate.value,
                active: "1",
                is_deleted: "0"
            }

            await axios.post('/credit_card/create',cdtCardObj).then(res => {
                disabledBtn.value = false
            }).catch(err => {

            })
        }



        return {
            services,
            servicesSelected,
            formattedServices,
            saveCreditCard,
            
            disabledBtn,

            cardCreditTypes,
            cdtCardNumber,
            cdtCardHolder,
            cdtCardExpDate,
            cdtCardTypesSelected,
            cdtCardCVV
        }
    }


}

</script>