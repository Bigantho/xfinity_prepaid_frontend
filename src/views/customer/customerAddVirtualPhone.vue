<template>
    <v-container>
        <v-card class="pa-5 text-center">
            <h1>Add Virtual Phone</h1>
            <br>
            <v-row>
                <v-col cols="6">
                    <v-select :items="states" label="States">

                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-select :items="areaCodes" label="Area Code">

                    </v-select>

                </v-col>
            </v-row>
            <v-btn append-icon="mdi mdi-content-save" color="#4D87E2">
                Finish Process
            </v-btn>
            <v-btn class="x-btn">
test ntn
            </v-btn>
            <!-- <v-btn>
                Test
                <template #append>
                    <img src="../../assets/cld_1.svg" alt="Custom Icon"  />
                </template>
            </v-btn> -->
        </v-card>
    </v-container>
</template>

<style scoped>

.x-btn{
    background-color: #51ecec30;
}</style>

<script lang="js">
import { ref } from 'vue'
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

        const areaCodes = ref([
            '896', '789', '369', '888', '362'
        ])

        return {
            states,
            areaCodes
        }
    }
}

</script>