<template>
    <div>
        <device-navi class="device-navi clearfix" @change-pull="setPull" @area-click="areaQuery"></device-navi>

        <div class="device" :style="ispull?'margin-left:0px':'margin-left: 140px'">
            <!-- 面包屑 -->
            <bread-crumb
                :crumb-array="[{name:$t('lang.device-manage')}, {name:$t('lang.device-list')}]"
            >
                <el-button
                    plain
                    type="primary"
                    @click="goMap()"
                    size="mini"
                    style="position:absolute"
                >{{$t('lang.device-map')}}</el-button>
                <!-- <i class="el-icon-location icon-map" ></i> -->
            </bread-crumb>

            <main-content>
                <!-- 搜索、按钮行 -->
                <el-row type="flex" justify="end" class="search-row">
                    <el-button
                        type="primary"
                        size="medium"
                        @click="openManyAssign"
                        :disabled="multiDevices.length>0?false:true"
                    >{{$t('lang.device-assign')}}</el-button>
                    <el-button
                        type="primary"
                        size="medium"
                        @click="batchVisible = true"
                        v-if="loginType!=userType.AirConUser"
                    >{{$t('lang.device-import')}}</el-button>
                    <el-button
                        type="primary"
                        size="medium"
                        @click="addVisible=true"
                        v-if="loginType!=userType.AirConUser"
                    >{{$t('lang.device-add')}}</el-button>
                    <!-- v-if="multiDevices.length>0" -->

                    <el-button type="primary" size="medium" @click="isSearch=!isSearch">
                        {{$t('lang.more-queries')}}
                        <i
                            v-if="isSearch"
                            class="el-icon-arrow-down el-icon--right"
                        ></i>
                        <i v-if="!isSearch" class="el-icon-arrow-up el-icon--right"></i>
                    </el-button>
                </el-row>
                <el-row v-if="isSearch">
                    <search-group @query="query" @cancel-query="cancelQuery"></search-group>
                </el-row>
                <!-- table -->
                <el-row class="table-row" v-loading="tableLoading">
                    <el-col :span="24">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column
                                type="selection"
                                :selectable="selectable"
                                v-if="loginType!=userType.AirConUser"
                            ></el-table-column>
                            <el-table-column
                                prop="serialno"
                                :label="$t('lang.device-serial')"
                                fixed="left"
                            ></el-table-column>
                            <el-table-column prop="name" :label="$t('lang.device-name')"></el-table-column>
                            <el-table-column prop="gateway.mac" :label="$t('lang.gateway-mac')"></el-table-column>
                            <el-table-column prop="type_name" :label="$t('lang.device-type')"></el-table-column>
                            <el-table-column
                                :label="$t('lang.external-num')+'/'+$t('lang.internal-num')"
                            >
                                <template slot-scope="scope">
                                    <span>{{scope.row.external_count}}/</span>
                                    <span>{{scope.row.internal_count}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="belongto.loginname"
                                :label="$t('lang.device-belongto')"
                            ></el-table-column>
                            <el-table-column
                                :label="$t('lang.online-time')"
                                sortable
                                prop="online_time"
                            >
                                <template slot-scope="scope">
                                    <span>{{scope.row.online_time ? scope.row.online_time : "--"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('lang.device-status')">
                                <template slot-scope="scope">
                                    <div
                                        v-if="scope.row.status == '0'"
                                        class="color-info"
                                    >{{$t('lang.offline')}}</div>
                                    <div
                                        v-if="scope.row.status == '1'"
                                        class="color-green"
                                    >{{$t('lang.online')}}</div>
                                    <div
                                        v-if="scope.row.status == '2'||scope.row.status == '3'"
                                        class="color-danger"
                                    >{{$t('lang.unusual')}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('lang.operate')" fixed="right">
                                <template slot-scope="scope">
                                    <div class="table-icon-group">
                                        <img
                                            src="@/assets/images/icon/assign.png"
                                            :title="$t('lang.assign')"
                                            v-if="loginType==scope.row.belongto.type"
                                            @click="openSingleAssign(scope.row.id)"
                                        />
                                        <img
                                            src="@/assets/images/icon/edit.png"
                                            v-if="loginType!=userType.AirConUser"
                                            :title="$t('lang.edit')"
                                            @click="openEdit(scope.$index)"
                                        />
                                        <img
                                            v-if="scope.row.isDisabled && loginType!=userType.AirConUser"
                                            src="@/assets/images/icon/enabled.png"
                                            :title="$t('lang.disable')"
                                            @click="changeDisable(scope.row)"
                                        />
<!--                                        <img-->
<!--                                            v-if="!scope.row.isDisabled && loginType!=userType.AirConUser"-->
<!--                                            src="@/assets/images/icon/disabled.png"-->
<!--                                            :title="$t('lang.enable')"-->
<!--                                            @click="changeDisable(scope.row)"-->
<!--                                        />-->
                                        <img
                                            v-if="loginType!=userType.AirConUser"
                                            src="@/assets/images/icon/delete.png"
                                            :title="$t('lang.delete')"
                                            @click="deleteItem(scope.row.id)"
                                        />
                                        <el-dropdown @command="handleCommand">
                                            <span class="el-dropdown-link">
                                                <img
                                                    src="@/assets/images/icon/more.png"
                                                    :title="$t('lang.see-more')"
                                                />
                                            </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item
                                                    :command="{name:'detail',params:scope.row}"
                                                >{{$t('lang.device-detail')}}</el-dropdown-item>
                                                <el-dropdown-item
                                                    :command="{name:'monitor',params:scope.row}"
                                                >{{$t('lang.device-monitor')}}</el-dropdown-item>
                                                <el-dropdown-item
                                                    :command="{name:'alarmRule',params:scope.row}"
                                                >{{$t('lang.alarm-rule')}}</el-dropdown-item>

                                                <el-dropdown-item
                                                    :command="{name:'deviceMap',params:scope.row}"
                                                >{{$t('lang.install-site')}}</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <!--  分页 -->
                <el-row class="paginate-row">
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

                <!-- 添加-->
                <create
                    :dialog-visible="addVisible"
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
                <!-- 设备分配 -->
                <assign
                    :dialog-visible="assignVisible"
                    :devices-id="devicesId"
                    @assign-success="assignSuccess"
                    @dialog-close="assignVisible=false"
                ></assign>


                <!-- 设备批量导入 -->
                <batch-import
                    :dialog-visible="batchVisible"
                    @import-success='refresh'
                    @dialog-close="batchVisible=false"
                ></batch-import>
            </main-content>
        </div>
    </div>
</template>

<script>
import Create from "./Create";
import Edit from "./Edit";
import Assign from "./Assign";
import searchGroup from "./SearchGroup";
import DeviceNavi from "./deviceNavi";
import BatchImport from './BatchImport'
export default {
    data() {
        return {
            searchKey: "",
            tableData: [],
            isSearch: false,
            tableLoading: false,
            //组件visible
            addVisible: false,
            editVisible: false,
            assignVisible: false,
            batchVisible: false,
            devicesId: [],
            editForm: {},
            ispull: false,
            //选中tableData
            multiDevices: [],
            currentPage: 1,
            totalNum: 0,
            pageSize: 20
        };
    },
    created() {
        this.getList();
    },

    components: {
        create: Create,
        edit: Edit,
        assign: Assign,
        "search-group": searchGroup,
        "device-navi": DeviceNavi,
        'batch-import': BatchImport
    },
    methods: {
        //获取设备列表
        getList(params) {
            let baseParams = {
                page: this.currentPage,
                pageSize: this.pageSize
            };
            this.tableLoading = true;
            this.$api.restfulApi
                .list("device", Object.assign(baseParams, params))
                .then(res => {
                    console.log("deviceList", res);
                    this.tableData = res.data;
                    this.currentPage = res.meta.pagination.current_page;
                    this.totalNum = res.meta.pagination.total;
                    this.tableLoading = false;
                }).catch(err => {
                this.tableLoading = false;
            })
        },
        //删除
        deleteItem(id) {
            this.$confirm(this.$t("lang.affirm-delete"), this.$t("lang.tip"), {
                confirmButtonText: this.$t("lang.submit"),
                cancelButtonText: this.$t("lang.cancel"),
                type: "warning"
            }).then(() => {
                this.$api.restfulApi.delete("device", id).then(res => {
                    this.$message.success(this.$t("lang.delete-success"));
                    this.getList();
                });
            });
        },
        //停用启用
        // changeDisable(item) {
        //     this.$confirm(
        //         item.isDisabled
        //             ? this.$t("lang.affirm-disabled")
        //             : this.$t("lang.affirm-enabled"),
        //         this.$t("lang.tip"),
        //         {
        //             confirmButtonText: this.$t("lang.submit"),
        //             cancelButtonText: this.$t("lang.cancel"),
        //             type: "warning"
        //         }
        //     ).then(() => {
        //         item.isDisabled = !item.isDisabled;
        //         this.$message.success(
        //             item.isDisabled
        //                 ? this.$t("lang.enabled-success")
        //                 : this.$t("lang.disabled-success")
        //         );
        //     });
        // },
        //打开多设备分配
        openManyAssign() {
            for (let i = 0; i < this.multiDevices.length; i++) {
                this.devicesId[i] = this.multiDevices[i].id;
            }
            this.assignVisible = true;
        },
        //打开单设备分配
        openSingleAssign(id) {
            this.assignVisible = true;
            this.devicesId[0] = id;
        },
        //分配成功
        assignSuccess() {
            this.assignVisible = false;
            this.getList();
        },
        //table多选
        handleSelectionChange(val) {
            this.multiDevices = val;
        },
        //设备是否可选来分配
        selectable(row, index) {
            return this.loginType == row.belongto.type;
        },
        //点击编辑
        openEdit(index) {
            this.editVisible = true;
            this.editForm = _.clone(this.tableData[index]);
        },
        //查询
        query(params) {
            this.getList(params);
        },
        cancelQuery(params) {
            this.isSearch = false;
            this.getList(params);
        },
        //设备导航栏的收缩
        setPull(val) {
            this.ispull = val;
        },
        //管理域搜索
        areaQuery(val) {
            console.log(val);
            let params = { areaId: val };
            this.getList(params);
        },
        //刷新table
        refresh() {
            this.addVisible = false;
            this.editVisible = false;
            this.batchVisible= false;
            this.getList();
        },
        //打开地图
        goMap() {
            this.$router.push("/devicemap/");
        },
        
        // 查看更多
        handleCommand(command) {
            // console.log(command);
            switch (command.name) {
                case "detail":
                    this.$router.push("/device/" + command.params.id);
                    break;
                case "monitor":
                    this.$router.push("/monitor/" + command.params.id);
                    break;
                case "deviceMap":
                    this.$router.push("/devicemap?id=" + command.params.id);
                    break;
                case "alarmRule":
                    this.$router.push("/rule?device_id=" + command.params.id);
                    break;
                default:
                    break;
            }
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        }
    }
};
</script>

<style lang="scss" scoped>

.device{
    transition: .7s;
}
.device-navi {
    position: fixed;
    left: 0;
    margin-top: -20px;
}
.icon-map {
    position: absolute;
    left: 210px;
    color: #67c23a;
    font-size: 20px;
    top: 2.5px;
}
.el-dropdown-menu {
    background: #ffffff;
    padding: 20px 10px;
}
</style>