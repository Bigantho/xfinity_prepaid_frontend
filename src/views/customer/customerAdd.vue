<template>
    <h2 class="xp-title-table">Personal Information</h2>
    <br>
    <v-row>
        <v-col cols="4">
            <v-text-field label="Nombre" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Apellido" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Gender" variant="outlined"></v-text-field>
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
                    <v-date-picker v-model="dateSelected"></v-date-picker>
                </v-card>
            </v-menu>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Cellphone" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Email" variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <v-text-field label="Home Phone" variant="outlined"></v-text-field>
        </v-col>
    </v-row>

    <h2 class="xp-title-table">Personal Address</h2>
    <br>
    <v-row>
        <v-col cols="4">
            <v-select label="State" :items="states"></v-select>
        </v-col>
        <v-col cols="4">
            <v-text-field label="City" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Zipcode" variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <v-text-field label="Address Street 1" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="Address Street 2" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-select label="Country" :items="['USA']" v-model="countrySelected" disabled></v-select>
        </v-col>
    </v-row>

    <v-row class="center">
        <v-col cols="12" class="text-center">
            <v-btn color="primary" append-icon="mdi-arrow-right-thin"
                @click="$router.push({ name: 'customerAddCreditCard' })">
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
import { ref, computed } from 'vue'
export default {
    setup() {

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

        return {
            states,
            countrySelected,

            menu,
            dateSelected,
            formattedRange

        }
    }
}


</script>