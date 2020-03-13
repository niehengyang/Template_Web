<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb :crumb-array="crumbArray"></bread-crumb>

        <el-tabs class="tab-style" v-model="tabActiveName" @tab-click="tabClick">
            <el-tab-pane v-for="(tab,index) in tabArray" :label="tab.label" :name="tab.name" :key="index"></el-tab-pane>
        </el-tabs>

        <router-view></router-view>

    </div>
</template>

<script>
   import tabMixin from "@/utils/tabMixin";

    export default {
        mixins:[tabMixin],
        data() {
            return {
                tabActiveName: 'deviceType',
                tabArray:[
                    {label: this.$t('lang.type-manage'), name: 'deviceType', path: '/devicetype/'},
                    // {label: this.$t('lang.model-manage'), name: 'deviceModel', path: '/devicetype/devicemodel/'}
                ],
                crumbArray: [
                    {name:this.$t('lang.device-manage')},
                    {name: this.$t('lang.device-type')}
                ]
            }
        },
        created() {
        },
        methods: {

        }
    }
</script>

<style lang="scss">

</style>