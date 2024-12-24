<template>
    <h2 class="xp-title-table">Personal Information</h2>
    <br>
    <v-row>
        <v-col cols="4">
            <v-text-field label="Nombre" variant="outlined" v-model="customerName"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Apellido" variant="outlined" v-model="customerLastName"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Gender" variant="outlined" v-model="customerGender"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <v-menu v-model="menu" :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                    <v-text-field label="Birthday" v-bind="props" v-model="formattedRange"
                        variant="outlined"></v-text-field>
                </template>
                <v-card min-width="300">
                    <v-date-picker v-model="customerBirthday"></v-date-picker>
                </v-card>
            </v-menu>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Cellphone" variant="outlined" v-model="customerCellPhone"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Email" variant="outlined" v-model="customerEmail"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <v-text-field label="Home Phone" variant="outlined" v-model="customerHomePhone"></v-text-field>
        </v-col>
    </v-row>

    <h2 class="xp-title-table">Personal Address</h2>
    <br>
    <v-row>
        <v-col cols="4">
            <v-select label="State" :items="states" v-model="customerStateSelected"></v-select>
        </v-col>
        <v-col cols="4">
            <v-text-field label="City" variant="outlined" v-model="customerCity"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Zipcode" variant="outlined" v-model="customerZipcode"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <v-text-field label="Address Street 1" variant="outlined" v-model="customerAddress1"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Address Street 2" variant="outlined" v-model="customerAddress2"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-select label="Country" :items="['USA']" v-model="customerCountrySelected" disabled></v-select>
        </v-col>
    </v-row>

    <v-row class="center">
        <v-col cols="12" class="text-center">
            <v-btn color="primary" append-icon="mdi-arrow-right-thin" @click="saveCustomer">
                NEXT
            </v-btn>
        </v-col>
    </v-row>

</template>
<style scoped>
.xp-card-title {
    text-align: center;
    font-size: 1em;
    color: #5426D6;
}
</style>
<script lang="js">
import { ref, computed, inject } from 'vue'
export default {
    setup() {
        const axios = inject('$axios')

        const customerName = ref("Anthony")
        const customerLastName = ref("Vasquez")
        const customerGender = ref("Male")
        const customerBirthday = ref(null)
        const customerCellPhone = ref("1412123241")
        const customerEmail = ref("avasque9@red5g.com")
        const customerHomePhone = ref("24242414")
        const customerStateSelected = ref("")
        const customerCity = ref("Mejicanos")
        const customerZipcode = ref("01101")
        const customerAddress1 = ref("San Salvador, Col Roma")
        const customerAddress2 = ref("Salvador Mundi")
        const customerCountrySelected = ref("USA")

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

        const countrySelected = "USA"

        const menu = ref(false)
        // Computed property to format the date range for display
        const formattedRange = computed(() => {
            let date = customerBirthday.value;

            if (date != null) {
                date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                menu.value = false
                return date
            }

            return '';
        });

        const saveCustomer = async () => {

            const customerObj = {
                
                name: customerName.value,
                last_name: customerLastName.value,
                address_country: customerGender.value,
                address_street: customerAddress1.value,
                address_house: "",
                address_state: customerStateSelected.value,
                address_city: customerCity.value,
                address_zipcode: customerZipcode.value,
                created_by: 1,
                birthday: customerBirthday.value,
                phone_number: customerCellPhone.value,
                email: customerEmail.value,
                active: 1,
                is_deleted: 0,

            }
            await axios.post('/customer/create',
                customerObj

            ).then(response => {
                // customers.value = response.data.data
                // items.value = clients;
                // loading.value = false
                // return clients
            }).catch(error => {
                console.error("Hubo un error en la solicitud: ", error);
                // return error;
            });
        }

        return {
            states,
            countrySelected,

            menu,
            formattedRange,
            saveCustomer,

            customerName,
            customerLastName,
            customerGender,
            customerBirthday,
            customerCellPhone,
            customerEmail,
            customerHomePhone,
            customerStateSelected,
            customerCity,
            customerZipcode,
            customerAddress1,
            customerAddress2,
            customerCountrySelected

        }
    }
}


</script>