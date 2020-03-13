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
                    {name: this.$t('lang.users-manage')},
                ],
                tabActiveName: 'userManage',
                tabArray: [
                    {label: this.$t('lang.users-manage'), name:'userManage', path: '/sys/'},
                    {label: this.$t('lang.role-manage'), name: 'userRole', path:'/sys/role'}
                ]
            }
        },
        components: {

        },
        methods: {

        }
    }
</script>

<style lang="sass" rel="stylesheet/sass">

</style>