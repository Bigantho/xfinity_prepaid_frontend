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
            <v-col cols="3">
                <v-text-field v-model="searchParam" label="Search by Serial or Mac" variant="outlined" hide-details>

                </v-text-field>

            </v-col>
            <v-col cols="2">
                <v-btn icon="mdi mdi-magnify" variant="outlined" base-color="green"
                    @click="getRouters(searchParam)"></v-btn>
            </v-col>
        </v-row>
        <br>
        <v-card>
            <v-data-table :headers="headersRouters" :items="routers" height="450" item-value="name" fixed-header>
                <template v-slot:item.status="{ item }">
                    <v-chip variant="tonal" color="#447845" rounded>
                        {{ item.status }}
                    </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex align-center">
                        <v-btn icon="mdi-printer-outline" variant="text" @click="openWindow(item.correlative)">
                        </v-btn>
                        <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item.id)">
                        </v-btn>
                    </div>
                </template>

                <template v-slot:item.createdAt="{ item }">
                    {{ proxy.$globalMethods.convertToUTC6(item.createdAt) }}
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="showDialog" width="50%">
            <v-card class="pa-10 text-center">
                <h2>Router's Status</h2>
                <br>
                <v-select :items="routerStatuses" v-model="routerStatusesSelected" item-title="name" item-value="id"
                    label="Select Status">

                </v-select>

                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="showDialog = false" variant="outlined">
                        Cancelled
                    </v-btn>

                    <v-btn @click="updateRouter()" variant="outlined">
                        Save
                    </v-btn>
                </template>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="js">
import { ref, computed, inject, onMounted, getCurrentInstance } from "vue"
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
export default {

    setup() {
        const axios = inject('$axios')
        const $router = useRouter()
        const searchParam = ref('')
        const showDialog = ref(false)
        const routerPicked = ref(null)
        const routerStatuses = ref([])
        const routerStatusesSelected = ref(null)
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
            { title: 'Serial', align: 'center', key: 'serial' },
            { title: 'MAC', align: 'center', key: 'macAddress' },
            { title: 'Status', align: 'center', key: 'status' },
            { title: 'Actions', align: 'center', key: 'actions' }
        ])

        const routers = ref([])


        const getRouters = async (search = "") => {
            await axios.get('/router/total', {
                params: {
                    query: search.trim()
                }
            }).then(res => {
                routers.value = res.data.data
            }).catch(err => {

            })
        }

        const getRoutersCatalog = async () => {
            await axios.get('/router/catalog').then(res => {
                console.log(res);

                routerStatuses.value = res.data.data
            }).catch(err => { })
        }

       

        const updateRouter = async () => {
            console.log("udopated");

            await axios.put(`/router/update/${routerPicked.value}`, {
                id_statuses_routers: routerStatusesSelected.value
            }).then(res => { })
                .catch(err => {
                    console.log(err);

                })
                .finally(() => { showDialog.value = false  ;getRouters() })
        }

        const openWindow = async (correlative) => {
            const url = $router.resolve({ name: 'orderPrintLabel', params: { id_router: correlative } }).href
            window.open(url, '_blank')
        }

        const openDialog = async (id) => {
            routerPicked.value = id
            showDialog.value = true
        }

        onMounted(() => {
            getRouters()
            getRoutersCatalog()
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
            proxy,
            searchParam,
            openDialog,
            routerStatuses,
            routerStatusesSelected,
            updateRouter,
            routerPicked,
            showDialog,
           
        }
    }
}

</script>