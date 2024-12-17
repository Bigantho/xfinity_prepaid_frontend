<template>
    <h1>{{ name }}</h1>
</template>

<script lang="js">
import { ref } from 'vue'
export default {
    setup() {
        const name = ref('Anthony Vasquez')


        return {
            name
        }
    }
}

</script>