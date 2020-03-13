<template>
    <div>
        <el-row>
            <el-col>
                <el-card class="box-card">
                    <p>{{$t('lang.new-user')}}</p>
                    <div>
                        <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
                            <el-table-column prop="type" :label="$t('lang.new-category')">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.type=='airUser'">{{$t('lang.user')}}</span>
                                    <span v-if="scope.row.type=='salesManager'">{{$t('lang.customer-manager')}}</span>
                                    <span v-if="scope.row.type=='systemChigo'">{{$t('lang.vendor')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="monthAdmin" :label="$t('lang.current-month')"></el-table-column>
                            <el-table-column prop="seasonAdmin" :label="$t('lang.current-season')"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "NewStatis",
        data(){
            return{
                tableData: [
                    {user_type: '用户', month: '120', quarter: '456'},
                    {user_type: '客户技术经理', month: '20', quarter: '56'},
                    {user_type: '厂商人员', month: '13', quarter: '44'}
                ],
                tableLoading: false

            }
        },
        created(){
            this.getList()
        },
        methods: {
            // 获取表格数据
            getList(){
                this.tableLoading = true;
                this.$api.restfulApi
                    .list("statistical/newAddAdmin")
                    .then(res => {
                        console.log("newList", res);
                        this.tableData = res;
                        this.tableLoading = false;
                    }).catch(err => {
                    this.tableLoading = false;
                })
            },
        }
    }
</script>

<style scoped lang="scss">
.box-card{
    background: #fff;
    p{
        font-size: 18px;
        font-weight: bold;
        color: #666666;
    }
}
</style>