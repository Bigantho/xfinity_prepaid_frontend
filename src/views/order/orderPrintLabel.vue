<template>
    <v-container>
        <!-- <v-row>
            <v-col cols="6" class="text-center"> </v-col>
        </v-row> -->
        <v-row>
            <v-col cols="6" class="text-center">
                <h1 class="text-start">Label to download</h1>
                <div class="center-container text-center" ref="captureArea">
                    <div class="text-center xp-border-print">
                        <h3>INTERNET SERVICE SUPPORT</h3>
                        <h2> <v-icon icon="mdi-phone"></v-icon> <strong> (888) 409-3273
                            </strong> </h2>
                        <h3>{{ routerId }}</h3>
                    </div>
                </div>
            </v-col>
            <v-col cols="6" class="text-center">
                <v-btn prepend-icon="mdi mdi-camera-outline" class="mr-3" base-color="#4D87E2" @click="generateImg">
                    Capture Label
                </v-btn>
                <v-btn v-if="capturedImage" base-color="#4D87E2" prepend-icon="mdi mdi-folder-download-outline"
                    @click="downloadImage">Download Label</v-btn>

                <div v-if="capturedImage" class="image-preview">
                    <br>
                    <h2>Captured Label:</h2>
                    <img :src="capturedImage" style="width: 4in; height: 2in;" alt="Captured Content" />
                </div>
            </v-col>
        </v-row>
        <br>
        <br><br>
        <v-row>

        </v-row>
    </v-container>
</template>


<style scoped>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4in;
    height: 2in;
    border: dashed black;


}

.xp-border-print {
    /* width: 100%; */

    /* display: flex;
    justify-content: center;
    align-items: center; */
}
</style>

<script lang="js">
import { useRoute } from 'vue-router';
import html2canvas from 'html2canvas';
import { ref, defineProps } from 'vue'
export default {
    props: {
        routeCorrelative: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const $route = useRoute()
        const routerId = $route.params.id_router

        const captureArea = ref(null);
        const capturedImage = ref(null);
        const generateImg = async () => {
            if (captureArea.value) {
                try {
                    const canvas = await html2canvas(captureArea.value);
                    capturedImage.value = canvas.toDataURL("image/png"); // Convert canvas to image
                } catch (error) {
                    console.error("Error capturing image:", error);
                }
            }
        }

        const downloadImage = () => {
            if (capturedImage.value) {
                const link = document.createElement("a");
                link.href = capturedImage.value;
                // link.download = `Label-${props.routeCorrelative}.png`; // Set the default filename
                link.download = `Label-${routerId}.png`
                link.click();
            }
        };

        return {
            // routeCorrelative,
            routerId,
            captureArea,
            capturedImage,
            generateImg,
            downloadImage,
            props
        }
    }
}

</script>