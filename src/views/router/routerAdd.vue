<template>
    <v-container>
        <v-card class="pa-8">
            <h1 class="text-center">Routers Add</h1>
            <v-row>
                <v-col cols="2"><v-icon icon="mdi-arrow-top-left-bold-box-outline" @click="$router.go(-1)">
                    </v-icon>
                </v-col>

                <v-col class="text-end">
                    <h2><strong>{{ `${routerCorrelative}-${routerCorrelativeNum}` }}</strong></h2>
                </v-col>
            </v-row>
            <br>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Name" v-model="routerName" readonly variant="outlined">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="Serial" v-model="routerSerial">
                    </v-text-field>
                    <!-- <v-text-field label="Brand" v-model="routerBrand">
                    </v-text-field> -->
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="6">
                    <v-text-field label="MAC Address" v-model="formattedMac" placeholder="XX:XX:XX:XX:XX:XX"
                        maxlength="17" counter>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <!-- <v-text-field label="Model" v-model="routerModel">
                    </v-text-field> -->
                </v-col>
                <v-col cols="6">
                    <!-- <v-select :items="years" v-model="routerYearSelected" label="Year"></v-select> -->
                </v-col>
            </v-row>

            <br>
            <v-row>
                <v-col class="text-center">
                    <v-btn prepend-icon="mdi mdi-content-save" base-color="#4D87E2" size="large" @click="saveRouters">
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script lang="js">
import { ref, inject, onMounted, computed, watch } from "vue"
import { useRouter } from 'vue-router';

export default {

    setup() {
        const $router = useRouter();

        const $axios = inject('$axios')

        const routerName = ref("")
        // const routerBrand = ref("")
        const routerSerial = ref("")
        // const routerMAC = ref("")
        // const routerModel = ref("")
        // const routerYearSelected = ref("")
        const routerCorrelativeNum = ref("")
        const routerCorrelative = ref("CUXPR")

        const totalRouters = ref(0)
        const formattedMac = ref("")
        const years = ref([
            "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
            "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
            "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029",
            "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039",
            "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"
        ]
        )


        const saveRouters = async () => {

            const data = {
                mac_address: formattedMac.value,
                name: routerName.value,
                // brand: routerBrand.value,
                serial: routerSerial.value,
                // model: routerModel.value,
                // year: routerYearSelected.value,
                correlative: `${routerCorrelative.value}-${routerCorrelativeNum.value}`,
                is_deleted: "0",
                active: "1",
            }
            await $axios.post('/router/create', data).then(res => {
                openWindow()
                generateCorrelative()
                clearFields()
            }).catch(err => {

            })
        }

        const getRouters = async () => {
            await $axios.get('/router/total').then(res => {
                totalRouters.value = res.data.correlativeCount
            }).catch(err => {

            })
        }

        const generateCorrelative = async () => {
            await getRouters()
            let correlativeNameRouter = (totalRouters.value + 1).toString().padStart(3, '0')
            routerName.value = `XFIN${correlativeNameRouter}`
            const correlativeNumber = (totalRouters.value + 1).toString().padStart(10, '0');
            routerCorrelativeNum.value = correlativeNumber
        }

        const openWindow = async () => {
            const url = $router.resolve({ name: 'orderPrintLabel', params: { id_router: `${routerCorrelative.value}-${routerCorrelativeNum.value}` } }).href
            window.open(url, '_blank')
        }

        const clearFields = () => {
            routerName.value = ""
            // routerBrand.value = ""
            routerSerial.value = ""
            // routerMAC.value = ""
            formattedMac.value = ""
            // routerModel.value = ""
            // routerYearSelected.value = ""

        }

        watch(formattedMac, (nuevoValor, valorAntiguo) => {
            const limpio = nuevoValor.replace(/:/g, '');

            const grupos = limpio.match(/.{1,2}/g) || [];

            const formateado = grupos.join(':');

            if (formateado !== nuevoValor) {
                formattedMac.value = formateado;
            }
        })


        onMounted(() => {
            generateCorrelative()

        })

        return {
            years,
            routerName,
            // routerBrand,
            routerSerial,
            // routerMAC,
            // routerModel,
            // routerYearSelected,
            routerCorrelative,
            routerCorrelativeNum,

            saveRouters,
            totalRouters,

            openWindow,
            clearFields,
            formattedMac
            // formattedMacComputed
        }
    }
}

</script>