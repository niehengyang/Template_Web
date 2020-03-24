<template>
    <div class="table-box">
        <el-table :data="tableData" width="20">
            <el-table-column label>
                <template slot-scope="scope">
                    <span v-if="scope.row.type=='fault'">{{$t('lang.fault-alarm')}}</span>
                    <span v-if="scope.row.type=='data'">{{$t('lang.alarm-data')}}</span>
                    <span v-if="scope.row.type=='offline'">{{$t('lang.alarm-offline')}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('lang.this-day')" prop="nowNum"></el-table-column>
            <el-table-column :label="$t('lang.this-week')" prop="weekNum"></el-table-column>
            <el-table-column :label="$t('lang.this-month')" prop="monthNum"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            tableData: []
        };
    },
    watch: {},
    created() {
        this.init();
    },
    components: {},
    methods: {
        init(){
            this.$api.restfulApi.list('statistical/timeToAlarmNum').then(res=>{
                console.log('时间告警',res);
                this.tableData=res;
            })
        }
    }
};
</script>

<style lang="scss">
.table-box {
    text-align: left;
    .el-table__header thead th {
        background:#F4F7FA;
    }
}
</style>
