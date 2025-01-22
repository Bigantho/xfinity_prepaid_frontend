<template>
    <v-container>

        <h1 class="text-center">Payments</h1>
        <br>
        <v-row>
            <v-col cols="3">
                <v-btn prepend-icon="mdi mdi-plus-circle" base-color="#4D87E2"
                    @click="$router.push({ name: 'paymentAdd' })">
                    New Payment
                </v-btn>
            </v-col>
            <v-col cols="3" offset="4">
                <v-menu v-model="menu" :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <v-text-field append-inner-icon="mdi mdi-calendar" label="Creation Date" v-bind="props"
                            v-model="formattedRange" variant="outlined" disabled></v-text-field>
                    </template>
                    <v-card min-width="300">
                        <v-date-picker v-model="dateSelected" ></v-date-picker>
                    </v-card>
                </v-menu>
            </v-col>
            <v-col cols="2">
                <v-btn append-icon="mdi mdi-download" variant="outlined" base-color="green" disabled>
                    Excel
                </v-btn>
            </v-col>
        </v-row>
        <br>
        <v-card>
            <v-data-table :headers="headersPayment" :items="payments" height="450" item-value="name" fixed-header>
                <template v-slot:item.chargedAt="{ item }">
                    {{ proxy.$globalMethods.convertToUTC6(item.chargedAt) }}
                </template>
                <template v-slot:item.amount="{ item }">
                    {{ `$${item.amount}`}}
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script lang="js">
import { ref, computed, inject, onMounted,getCurrentInstance} from "vue"
import { useRouter } from "vue-router";
export default {

    setup() {
        const axios = inject('$axios')
        const $router = useRouter()
        const { proxy } = getCurrentInstance()

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

        const headersPayment = ref([
            { title: '#', align: 'center', key: 'position' },
            { title: 'Account', align: 'center', key: 'account'},
            { title: 'Amount', align: 'center', key: 'amount' },
            { title: '# Trx', align: 'center', key: 'trxId' },
            { title: 'Charged At', align: 'center', key: 'chargedAt' }

        ])

        const payments = ref([])


        const getPayments = async () => {
            await axios.get('/payment/total').then(res => {
                payments.value = res.data.data
            }).catch(err => {

            })
        }

     
        onMounted(() => {
            getPayments()
        })

        return {

            menu,
            dateSelected,
            formattedRange,
            headersPayment,
            payments,
            getPayments, proxy

        }
    }
}

</script>