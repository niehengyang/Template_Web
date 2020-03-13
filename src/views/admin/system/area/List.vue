<template>
  <div>
    <!-- 面包屑 -->
    <bread-crumb :crumbArray="[{name: $t('lang.MSconfig')},{name: $t('lang.area')}]"></bread-crumb>

    <!--  表格 -->
    <main-content>
      <!-- 搜索、按钮行 -->
<!--      <el-row class="search-row">-->
<!--        <el-col :span="24">-->
<!--          <div class="search-input-group">-->
<!--            <el-input-->
<!--                    style="width: 106%;"-->
<!--                    size="medium"-->
<!--                    :placeholder="$t('lang.hint-areaName')"-->
<!--                    v-model="searchKey"-->
<!--                    class="input-with-select"-->
<!--            >-->
<!--              <i slot="suffix" class="el-input__icon el-icon-search"></i>-->
<!--            </el-input>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row class="table-row">
        <el-col :span="24" v-loading="treeLoading">
          <el-tree
                  :data="tableData"
                  :props="props"
                  node-key="id"
                  ref="tree"
                  default-expand-all
                  :expand-on-click-node="false"
          >
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <div class="table-icon-group">
                <img src="@/assets/images/icon/edit.png"
                     v-if="data.parent"
                     @click="() => editData(data)" :title="$t('lang.edit')">
                <img src="@/assets/images/icon/delete.png"
                     v-if="data.parent && data.children.length == 0"
                     @click="() => deleteData(data.id)" :title="$t('lang.delete')">
                <img src="@/assets/images/icon/add.png" @click="() => addData(data)" :title="$t('lang.add')">
              </div>
            </div>
          </el-tree>

        </el-col>
      </el-row>


      <!-- 创建dialog弹窗 + form表单 -->
      <el-dialog class="dialog-form" :title="$t('lang.create-area')" :visible.sync="dialogFormVisible">
        <area-create :area-parent="area_parent" @close="closeCreate" @create="createHandle"></area-create>
      </el-dialog>

      <!-- 编辑弹窗 -->
      <el-dialog class="dialog-form" :title="$t('lang.edit')" :visible.sync="dialogEditVisible">
        <area-edit :edit-data="dialogEditForm" @closeEdit="closeEdit" @edit="editConfirm"></area-edit>
      </el-dialog>
    </main-content>
  </div>
</template>

<script>
  import AreaCreate from './Create'
  import AreaEdit from './Edit'
  export default {
    name: "Area",
    data() {
      return {
        tableData: [{area_id:''}],
        treeLoading: false,
        props: {
          id: "id",
          label: "name",
          children: 'children',
        },
        searchKey: "",
        area_parent: '',
        dialogFormVisible: false,
        dialogEditVisible: false,
        pageSize: 10,
        currentPage: 1,
        totalNumber: 0,
        dialogEditForm: ''
      };
    },
    created() {
      this.initData();
    },
    components: {
      'area-create': AreaCreate,
      'area-edit': AreaEdit
    },
    watch: {
      searchKey(val){
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      //初始加载
      initData() {
        this.treeLoading = true;
        this.$api.restfulApi.list('area').then(res => {
          console.log(res)
          this.tableData = res.data
          this.treeLoading = false
        }).catch(err => {
          this.treeLoading = false
        })
      },
      //编辑
      editData(data) {
        console.log(data)
        this.dialogEditForm = _.clone(data)
        this.dialogEditVisible = true
      },
      //创建子域
      addData(data) {
        this.area_parent = data
        console.log(this.area_parent)
        this.dialogFormVisible = true
      },
      //删除
      deleteData(id) {
        this.$confirm(this.$t('lang.hint-delete'), this.$t('lang.tip'), {
          confirmButtonText: this.$t('lang.confirm'),
          cancelButtonText: this.$t('lang.cancel'),
          type: "warning"
        })
                .then(() => {
                  this.$api.restfulApi.delete('area', id).then(() => {
                    this.$message({
                      message: this.$t('lang.delete-success'),
                      type: "success"
                    });
                    this.initData();
                  });
                })
      },
      // 关闭编辑弹窗
      closeEdit(){
        this.dialogEditVisible = false
      },
      // 编辑后更新数据
      editConfirm(){
        this.dialogEditVisible = false
        this.initData()
      },
      //关闭创建弹窗
      closeCreate(){
        this.dialogFormVisible = false
      },
      //创建后更新数据
      createHandle(){
        this.initData()
        this.dialogFormVisible = false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-tree{
    padding: 20px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    .custom-tree-node{
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      align-content: center;
      .desc-item{
        width: 50%;
        font-size: 14px;
        color: #B9C6D5;
        letter-spacing: 0;
        line-height: 22px;
        display: block;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .table-icon-group{
        margin-left: 20px;
        width: 120px;
        right: 0;
        img{
          margin-right: 14px;
        }
      }
    }
  }

</style>