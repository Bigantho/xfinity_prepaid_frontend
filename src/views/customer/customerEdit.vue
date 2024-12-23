<template>
    <v-container class="text-center">
        <h1>Customers</h1>
        <v-card class="pa-10">
            <h1>Personal Information</h1> <br>
            <v-row>
                <v-col cols="4"><v-text-field label="Nombre" variant="outlined"></v-text-field></v-col>
                <v-col cols="4"><v-text-field label="Apellido" variant="outlined"></v-text-field></v-col>
                <v-col cols="4"><v-text-field label="Gender" variant="outlined"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-menu v-model="menu" :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                            <v-text-field label="Birthday" v-bind="props" v-model="formattedRange"
                                variant="outlined" append-inner-icon="mdi mdi-calendar"></v-text-field>
                        </template>
                        <v-card min-width="300">
                            <v-date-picker v-model="dateSelected"></v-date-picker>
                        </v-card>
                    </v-menu>
                </v-col>
                <v-col cols="4"><v-text-field label="Cellphone" variant="outlined"></v-text-field></v-col>
                <v-col cols="4"><v-text-field label="Email" variant="outlined"></v-text-field></v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <v-text-field label="Home Phone" variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <h1>Personal Address</h1> <br>
            <v-row>
                <v-col cols="4"><v-select :items="states" label="States"></v-select></v-col>
                <v-col cols="4"><v-text-field label="City" variant="outlined"></v-text-field></v-col>
                <v-col cols="4"><v-text-field label="Zipcode" variant="outlined"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="4"><v-text-field label="Address Street 1" variant="outlined"></v-text-field></v-col>
                <v-col cols="4"><v-text-field label="Address Street 2" variant="outlined"></v-text-field></v-col>
                <v-col cols="4"><v-text-field label="Country" variant="outlined" disabled
                        v-model="country"></v-text-field></v-col>
            </v-row>
            <h1>Credit Card</h1> <br>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Number Card" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="Card Holder" variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Expiration Date" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="CVV" variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col> <v-btn color="primary" append-icon="mdi mdi-content-save">
                        SAVE
                    </v-btn></v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style scoped></style>

<script lang="js">
import { ref, computed } from "vue"
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

        const country = ref("USA")


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
            country,
            menu,
            dateSelected,
            formattedRange
        }
    }
}

</script>