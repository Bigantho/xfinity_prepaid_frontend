<template>
    <v-container>
        <v-card class="pa-5 text-center">
            <h1>Add Virtual Phone</h1>
            <br>
            <v-row v-show="false">
                <v-col cols="6">
                    <v-select :items="states" label="States" >

                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-select :items="areaCodes" label="Area Code"  hidden="true">

                    </v-select>

                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Phone Number" variant="outlined" v-model="phoneNumber">

                    </v-text-field>

                </v-col>
            </v-row>
            <v-btn append-icon="mdi mdi-content-save" color="#4D87E2" @click="saveVirtualPhone">
                Save and Finish Process
            </v-btn>
        </v-card>
    </v-container>
</template>

<style scoped></style>

<script lang="js">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {

    setup() {
        const $router = useRouter();

        const axios = inject('$axios')

        const phoneNumber = ref("")

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

        const saveVirtualPhone = async () => {
            const customerId = localStorage.getItem('customerId')

            const phoneNumberObj = {
                number: phoneNumber.value,
                id_customer: customerId

            }

            await axios.post('/virtual_phone_number/create', phoneNumberObj).then(res => {
                Swal.fire({
                    title: "Virtual Phone Added!",
                    text: res.data.msg,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: 'custom-text-color-confirm',
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Customer Created Successfully!", "", "success").then((res) => {
                            if (res.isConfirmed) {
                                $router.push({ name: 'customerTotal' })
                            }
                        });

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
            states,
            areaCodes,
            phoneNumber,
            saveVirtualPhone
        }
    }
}

</script>