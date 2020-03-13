<template>
    <div>
        <el-row>
            <el-col>
                <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
                    <el-table-column type="index" :label="$t('lang.index')"></el-table-column>
                    <el-table-column :label="$t('lang.data-name')">
                        <template slot-scope="scope">
                            <span>
                                {{$t(`lang.${tableParams.dataFlow}`)}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_at" :label="$t('lang.push-time')"></el-table-column>
                    <el-table-column prop="data_value" :label="$t('lang.value')"></el-table-column>
                    <el-table-column prop="unit" :label="$t('lang.unit')"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: ["tableParams"],
    data() {
        return {
            tableData: [],
            tableLoading: false
        };
    },
    created(){
        this.getList
    },
    watch: {
        tableParams(){
            this.getList()
        }
    },
    methods: {
        getList(){
            console.log(this.tableParams)
            if(this.tableParams == '') return
            //this.tableParams.attachDevId = 1081
            this.tableLoading = true
            this.$api.restfulApi.list("device/history", this.tableParams).then(res => {
                console.log(res)
                this.tableData = res.data
                this.tableLoading = false
            }).catch(err => {
                this.tableLoading = false
            })
        }
    }
};
</script>
<style lang="scss">
</style>