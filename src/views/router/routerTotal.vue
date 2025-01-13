<template>
    <v-container>

        <h1 class="text-center">Routers</h1>
        <br>
        <v-row>
            <v-col cols="3">
                <v-btn prepend-icon="mdi mdi-plus-circle" base-color="#4D87E2"
                    @click="$router.push({ name: 'routerAdd' })">
                    New Router
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
            <v-data-table :headers="headersRouters" :items="routers" height="450" item-value="name" hide-default-footer>
                <template v-slot:item.wasShipped="{ item }">
                    <v-chip variant="tonal" color="#447845" rounded>
                        {{ item.wasShipped ? "Enviado" : "No enviado" }}
                    </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-btn icon="mdi-printer-outline" variant="text" @click="openWindow(item.correlative)">
                    </v-btn>
                </template>

                <template v-slot:item.createdAt="{ item }">
                    {{ proxy.$globalMethods.convertToUTC6(item.createdAt) }}
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script lang="js">
import { ref, computed, inject, onMounted ,getCurrentInstance} from "vue"
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
export default {

    setup() {
        const axios = inject('$axios')
        const $router = useRouter()
        const { proxy } = getCurrentInstance()
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

        const headersRouters = ref([
            { title: '#', align: 'center', key: 'position' },
            { title: 'Order Number', align: 'center', key: 'account' },
            { title: 'Name', align: 'center', key: 'name' },
            { title: 'Correlative', align: 'center', key: 'correlative' },
            { title: 'Creation Date', align: 'center', key: 'createdAt' },
            // { title: 'Brand', align: 'center', key: 'brand' },
            { title: 'MAC', align: 'center', key: 'macAddress' },
            { title: 'Shipment', align: 'center', key: 'wasShipped' },
            { title: 'Actions', align: 'center', key: 'actions' }
        ])

        const routers = ref([])


        const getRouters = async () => {
            await axios.get('/router/total').then(res => {
                routers.value = res.data.data
            }).catch(err => {

            })
        }

        const openWindow = async (correlative) => {
            const url = $router.resolve({ name: 'orderPrintLabel', params: { id_router: correlative } }).href
            window.open(url, '_blank')
        }

        
        onMounted(() => {
            getRouters()
        })

        return {
            states,

            menu,
            dateSelected,
            formattedRange,
            headersRouters,
            routers,
            getRouters,

            openWindow,
            proxy
        }
    }
}

</script>