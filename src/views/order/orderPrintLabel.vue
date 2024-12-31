<template>
    <v-container>
        <div class="text-center xp-border-print" style="width: 4in;">
            <h3>INTERNET SERVICE SUPPORT</h3>
            <h2> <v-icon icon="mdi-phone" ></v-icon> <strong> (888) 409-3273
                </strong> </h2>
            <h3>{{ routerId }}</h3>
        </div>
    </v-container>
</template>


<style scoped>
.xp-border-print {
    border: dashed black;
}
</style>

<script lang="ts">
import { useRoute } from 'vue-router';

export default {
    setup() {
        const $route = useRoute()
        const routerId = $route.params.id_router

        return {
            routerId
        }
    }
}

</script>