<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
    @import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
    @import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
    @import '~@/assets/style/public-class.scss';

    .ag-unselectable {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
    }
</style>
