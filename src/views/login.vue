<template>
    <!-- <v-app id="inspire"> -->
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <!-- <v-flex> -->
                    <v-row class="text-center pa-5">
                        <v-col offset="3" cols="6">
                            <v-card class="elevation-12">
                                <!-- <v-toolbar dark color="#03194b">
                                    <v-toolbar-title>VIVA GROUP</v-toolbar-title>
                                </v-toolbar> -->
                                <v-card-text>
                                    <v-icon icon="mdi mdi-account-circle" size="100px"></v-icon>
                                    <v-form>
                                        <v-text-field tabindex="1" @keyup.enter="checkLogin" prepend-icon="person"
                                            name="user" label="Usuario" type="text" v-model="user"></v-text-field>
                                        <v-text-field tabindex="2" @keyup.enter="checkLogin" id="password"
                                            prepend-icon="lock" name="password" label="Contraseña" type="password"
                                            v-model="password"></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-btn style="background-color: #03194b; color: white;" class="align-center"
                                    @click="checkLogin()">Ingresar</v-btn>
                                <br>
                                <br>
                            </v-card>
                        </v-col>
                    </v-row>
                    <!-- </v-flex> -->
                </v-layout>
            </v-container>
        </v-content>
    <!-- </v-app> -->
</template>

<style scoped>
#inspire {
    /* background-color: red !important; */
    /* background: linear-gradient(to bottom, #5426D6, #4D87E2); */

}
</style>

<script>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import Swal from 'sweetalert2';

export default {
    name: 'Login',
    props: {
        source: String,
    },

    setup() {
        const router = useRouter();
        const user = ref("")
        const password = ref("")
        const axios = inject("$axios");
        const menuItems = ref([
            {
                title: "Dashboard",
                action: () => alert("Dashboard clicked"),
            },
            {
                title: "Settings",
                children: [
                    {
                        title: "Profile",
                        action: () => alert("Profile clicked"),
                    },
                    {
                        title: "Account",
                        action: () => alert("Account clicked"),
                    },
                ],
            },
            {
                title: "Help",
                children: [
                    {
                        title: "FAQ",
                        action: () => alert("FAQ clicked"),
                    },
                    {
                        title: "Contact",
                        action: () => alert("Contact clicked"),
                    },
                ],
            },
        ])
        const checkLogin = async () => {
            try {
                router.push({ name: 'dashboard' })
                return;
                if (user.value == "" || password.value == "") {
                    // Swal.fire({
                    //     title: "Debes completar todos los campos",
                    //     icon: "warning",
                    //     confirmButtonColor: "#3085d6",
                    //     confirmButtonText: "OK",
                    //     customClass: {
                    //         confirmButton: 'custom-text-color-confirm',
                    //     }
                    // }).then(() => { })

                } else {
                    const response = await axios.post("/auth/login", {
                        user: user.value,
                        password: password.value,
                    });

                    if (response.status == "200") {
                        localStorage.setItem('authToken', response.data.data.token)
                        router.push({ name: 'dashboard' })
                    } else {
                        // Swal.fire({
                        //     title: "Debes completar todos los campos",
                        //     text: response.data.msg,
                        //     icon: "warning",
                        //     confirmButtonColor: "#3085d6",
                        //     confirmButtonText: "OK",
                        //     customClass: {
                        //         confirmButton: 'custom-text-color-confirm',
                        //     }
                        // })
                    }
                }
            } catch (error) {
                // Swal.fire({
                //     title: "Credenciales incorrectas.",
                //     text: error.response.data.error,
                //     icon: "warning",
                //     confirmButtonColor: "#3085d6",
                //     confirmButtonText: "OK",
                //     customClass: {
                //         confirmButton: 'custom-text-color-confirm',
                //     }
                // })
            }
        }
        return {
            checkLogin,
            user,
            password,
            menuItems
        }
    }
};
</script>

<style></style>