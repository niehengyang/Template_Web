<!-- 主体内容面板组件 -->
<template>
    <div>
        <div class="main-content-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        components: {

        },
        methods: {

        }
    }
</script>

<style lang="scss">
.main-content-wrapper{
    background-color: #fff;
    padding: 30px;
    min-width:768px;
}
        
</style>