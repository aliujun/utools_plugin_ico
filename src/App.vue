<template>
    <div class="app-container">
        <ImageConverter />
    </div>
</template>

<script>
import ImageConverter from './components/ImageConverter.vue'

export default {
    name: 'App',
    components: {
        ImageConverter
    }
}
</script>

<style>
.app-container {
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
}
</style>
