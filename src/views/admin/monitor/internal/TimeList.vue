<template>
    <div class="time-list">
        <el-row>
            <el-col :span="12">
                <div class="title">{{$t('lang.time-state')}}</div>
            </el-col>
            <el-col :span="12">
                <el-button
                    type="primary"
                    style="float:right"
                    @click="addVisible=true"
                >{{$t('lang.time-add')}}</el-button>
            </el-col>
        </el-row>
        <el-row class="table-row" v-loading="tableLoading">
            <el-col :span="24">
                <el-table
                    ref="typeData"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top: 10px;"
                >
                    <el-table-column :label="$t('lang.index')" fixed type="index" width="80"></el-table-column>
                    <el-table-column :label="$t('lang.time-name')" fixed prop="name"></el-table-column>
                    <el-table-column :label="$t('lang.mode-set')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.runmode==0">{{$t('lang.mode-auto')}}</span>
                            <span v-if="scope.row.runmode==1">{{$t('lang.mode-cold')}}</span>
                            <span v-if="scope.row.runmode==2">{{$t('lang.mode-heating')}}</span>
                            <span v-if="scope.row.runmode==3">{{$t('lang.mode-dehumidification')}}</span>
                            <span v-if="scope.row.runmode==4">{{$t('lang.mode-wind')}}</span>
                            <span v-if="scope.row.runmode==5">{{$t('lang.mode-power')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.time-set')">
                        <template slot-scope="scope">
                            <div>{{scope.row.time_start}}~{{scope.row.time_end}}</div>
                            <div>
                                <span v-if="scope.row.repeat_way==1">{{$t("lang.only-one")}}</span>
                                <span v-if="scope.row.repeat_way==2">{{$t("lang.everyday")}}</span>
                                <span v-if="scope.row.repeat_way==3">{{$t("lang.workday")}}</span>
                                <span v-if="scope.row.repeat_way==4">
                                    <span v-for="(item,index) in scope.row.defined_at" :key="index">
                                        <span v-if="item==1">{{$t("lang.monday")}}&nbsp;</span>
                                        <span v-if="item==2">{{$t("lang.tuesday")}}&nbsp;</span>
                                        <span v-if="item==3">{{$t("lang.wednesday")}}&nbsp;</span>
                                        <span v-if="item==4">{{$t("lang.thursday")}}&nbsp;</span>
                                        <span v-if="item==5">{{$t("lang.friday")}}&nbsp;</span>
                                        <span v-if="item==6">{{$t("lang.saturday")}}&nbsp;</span>
                                        <span v-if="item==7">{{$t("lang.sunday")}}&nbsp;</span>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.operate')" fixed="right">
                        <template slot-scope="scope">
                            <div class="table-icon-group">
                                <img
                                    src="@/assets/images/icon/edit.png"
                                    :title="$t('lang.edit')"
                                    @click="openEdit(scope.$index)"
                                />
                                <img
                                    src="@/assets/images/icon/delete.png"
                                    :title="$t('lang.delete')"
                                    @click="deleteItem(scope.row.id)"
                                />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <!-- 添加定时 -->
        <create
            :dialog-visible="addVisible"
            :internal-id="internalId"
            @refresh="refresh"
            @dialog-close="addVisible=false"
        ></create>
        <!-- 编辑-->
        <edit
            :dialog-visible="editVisible"
            :form-data="editForm"
            @refresh="refresh"
            @dialog-close="editVisible=false"
        ></edit>
    </div>
</template>
<script>
import Create from "./Create";
import Edit from "./Edit";

export default {
    props: ["internalId"],
    data() {
        return {
            tableData: [
                {
                    name: "工作日定时"
                }
            ],
            tableLoading: false,
            addVisible: false,
            editVisible: false,
            editForm: {},
            runModeList: []
        };
    },
    components: {
        create: Create,
        edit: Edit
    },
    watch: {
        internalId: {
            handler(newVal, oldVal) {
                this.getList();
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.getList();
    },
    methods: {
        //获取
        getList() {
            this.tableLoading = true;
            this.$api.restfulApi
                .list("timing", { internal_id: this.internalId, pageSize: 10 })
                .then(res => {
                    console.log("timing", res);
                    this.tableData = res.data;
                    this.getInParams();
                    this.tableLoading = false;
                }).catch(err => {
                    this.tableLoading = false
            })
        },
        //获取内机参数
        getInParams() {
            this.$api.restfulApi
                .list("internal/" + this.internalId)
                .then(res => {
                    console.log(res);
                    let i = 0;
                    // if (res.runMode) {
                    //     let keyValue = "";
                    //     Object.keys(res.runMode).forEach(key => {
                    //         if (key == "auto") {
                    //             keyValue = "0";
                    //         } else if (key == "cold") {
                    //             keyValue = "1";
                    //         } else if (key == "heating") {
                    //             keyValue = "2";
                    //         } else if (key == "dehumidification") {
                    //             keyValue = "3";
                    //         } else if (key == "wind") {
                    //             keyValue = "4";
                    //         } else if (key == "power") {
                    //             keyValue = "5";
                    //         }
                    //         // this.runModeList[i] = {
                    //         //     label: this.$t("lang.mode-" + key + ""),
                    //         //     value: keyValue
                    //         // };
                    //         i++;
                    //     });
                    // }
                });
        },
        //点击编辑
        openEdit(index) {
            this.editVisible = true;
            this.editForm = _.clone(this.tableData[index]);
        },
        //删除
        deleteItem(id) {
            this.$confirm(this.$t("lang.affirm-delete"), this.$t("lang.tip"), {
                confirmButtonText: this.$t("lang.submit"),
                cancelButtonText: this.$t("lang.cancel"),
                type: "warning"
            }).then(() => {
                this.$api.restfulApi.delete("timing", id).then(res => {
                    this.$message.success(this.$t("lang.delete-success"));
                    this.getList();
                });
            });
        },
        // 刷新
        refresh() {
            this.addVisible = false;
            this.editVisible = false;
            this.getList();
        }
    }
};
</script>
<style lang="scss">
.time-list {
    .el-row {
        display: flex;
        align-items: flex-end;
        .title {
            font-size: 14px;
            font-weight: 600;
        }
    }
}
</style>