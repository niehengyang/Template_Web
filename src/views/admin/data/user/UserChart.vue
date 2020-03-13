<template>
    <div>
        <el-row>
            <el-col>
                <el-card class="box-card">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane :label="$t('lang.table')" name="first">
                            <el-row class="table-row" v-loading="tableLoading">
                                <el-col :sapn="24">
                                    <el-table :data="tableData" style="width: 100%">
                                        <el-table-column type="index" fixed :label="$t('lang.index')"></el-table-column>
                                        <el-table-column prop="regin_name" :label="$t('lang.region')"></el-table-column>
                                        <el-table-column prop="airConUser" :label="$t('lang.user-number')"></el-table-column>
                                        <el-table-column prop="salesManager" :label="$t('lang.customer-manager')"></el-table-column>
                                        <el-table-column prop="admin" :label="$t('lang.firm-admin')"></el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                            <!-- 表格分页 -->
                            <el-row class="paginate-row" style="padding-bottom: 18px;">
                                <el-col :span="24">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="currentPage"
                                            :page-sizes="[20, 50, 100, 200]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalNum"
                                    ></el-pagination>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('lang.view')" name="second" :key="activeName">
                            <ve-histogram :data="chartData" v-if="key='activeName'" :settings="chartSettings"></ve-histogram>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserChart",
        data(){
            this.chartSettings = {
                labelMap: {
                    省份: this.$t("lang.regin-name"),
                    用户: this.$t("lang.user"),
                    客户技术经理: this.$t("lang.customer-manager"),
                    厂商: this.$t("lang.vendor"),
                }
            };
            return {
                currentPage: 1,
                pageSize: 20,
                totalNumber: 0,
                tableLoading: false,
                activeName: 'first',
                tableData: [],
                chartData: {
                    columns: ['省份', '用户', '客户技术经理', '厂商'],
                    rows: []
                }
            }
        },
        created(){
            this.getUserList()
        },
        methods: {
            // 获取表格数据
            getUserList(params){
                this.tableLoading = true;
                this.$api.restfulApi
                    .list("statistical/adminCounty")
                    .then(res => {
                        console.log("userList", res);
                        this.tableData = res;
                        this.tableLoading = false;
                        res.forEach(item => {
                            this.chartData.rows.push({
                                '省份': item.regin_name,
                                '用户': item.airConUser,
                                '客户技术经理': item.salesManager,
                                '厂商': item.admin
                            })
                        })
                    }).catch(err => {
                    this.tableLoading = false;
                })
            },
            handleClick(tab, event) {
               // console.log(tab, event);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUserList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getUserList();
            }
        }
    }
</script>

<style scoped lang="scss">
    .box-card{
        background: #fff;
    }
</style>