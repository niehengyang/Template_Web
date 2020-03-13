<template>
    <div>
        <bread-crumb :crumb-array="crumbArray"></bread-crumb>

        <!-- Tab标签页 -->
        <el-tabs class="tab-style" v-model="tabActiveName" @tab-click="tabClick">
            <el-tab-pane v-for="tab in tabArray" :key="tab.name" :label="tab.label" :name="tab.name"></el-tab-pane>
        </el-tabs>

        <main-content>
            <router-view></router-view>
        </main-content>
    </div>
</template>

<script>

    import tabMixinJs from "@/utils/tabMixin.js";

    export default {
        mixins:[tabMixinJs],
        data() {
            return {
                crumbArray: [
                    {name: this.$t('lang.MSconfig')},
                    {name: this.$t('lang.detail-update'), url: '/ota'},
                    {name: this.$t('lang.ota')},
                ],
                tabActiveName: 'toupgrade',
                tabArray: [
                    {label: this.$t('lang.to-upgrade'), name:'toupgrade', path: '/upgrade/toupgrade/'+this.$route.params.ota_id},
                    {label: this.$t('lang.updating'), name: 'updating', path:'/upgrade/updating/'+this.$route.params.ota_id},
                    {label: this.$t('lang.update-finished'), name: 'updateFinished', path:'/upgrade/finished/'+this.$route.params.ota_id},
                    {label: this.$t('lang.update-failed'), name: 'updateFailed', path:'/upgrade/failed/'+this.$route.params.ota_id}
                ]
            }
        },
        created(){
            console.log(this.$route)
        },
        components: {

        },
        methods: {

        }
    }
</script>

<style lang="sass" rel="stylesheet/sass">

</style>