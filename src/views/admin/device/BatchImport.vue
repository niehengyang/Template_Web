<template>
    <el-dialog
        class="dialog-form"
        :title="$t('lang.device-import')"
        :visible.sync="visible"
        :before-close="close"
        @close="close"
    >
        <div class="up-box">
            <upload-excel :on-success="upSuccess" :before-upload="beforeUpload"></upload-excel>
            <p class="tip">{{$t('lang.up-excel')}}</p>
            <el-progress type="circle" :percentage="upPercentage" :width="40"></el-progress>
        </div>

        <div style="width:100%;text-align:center;margin:10px 0;">
            <span @click="downloadTemp" style="color:#409EFF;cursor:pointer;">{{$t('lang.down-temp')}}</span>
        </div>

        <el-progress :percentage="createpercentage" status="success" v-if="isCreate"></el-progress>

        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button
                size="medium"
                @click="close()"
                :disabled="createpercentage>0 & createpercentage<100?true:false"
            >{{$t('lang.cancel')}}</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="create()"
                :disabled="upPercentage!=100?true:false"
            >{{$t('lang.submit')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import UploadExcel from "@/components/UploadExcel";
export default {
    name: "BatchImport",
    props: ["dialogVisible"],
    data() {
        return {
            visible: false,
            isCreate: false,
            createForm: [],
            upPercentage: 0,
            createpercentage: 0,
            typeArr: [],
            errorNote: "",
            baudOptions: [
                { value: "1200" },
                { value: "1600" },
                { value: "1800" },
                { value: "2400" }
            ],
            protocolOptions: [
                { name: "MQTT", value: "0" },
                { name: "HTTP", value: "1" },
                { name: "COAP", value: "2" },
                { name: "MODBUS", value: "3" }
            ]
        };
    },
    components: {
        UploadExcel
    },
    created() {},
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
            if (newVal) {
                this.getType();
            }
        }
    },
    methods: {
        close() {
            this.upPercentage = 0;
            this.createpercentage = 0;
            this.createForm = [];
            this.isCreate = false;
            this.errorNote = "";
            this.$emit("dialog-close");
        },
        //提交表单
        create() {
            let that = this;
            this.isCreate = true;
            console.log("createForm:", this.createForm);
            if (this.errorNote != "") {
                this.$message({
                    showClose: true,
                    message: this.errorNote,
                    type: "error",
                    duration: 0,
                    dangerouslyUseHTMLString: true
                });
                return;
            }
            axios
                .post("/api/batchAdd/", this.createForm, {
                    onUploadProgress: progressEvent => {
                        let complete =
                            ((progressEvent.loaded / progressEvent.total) *
                                90) |
                            0;
                        that.createpercentage = complete;
                    }
                })
                .then(() => {
                    this.$message.success(this.$t("lang.add-success"));
                    this.createpercentage = 100;
                    this.upPercentage = 0;
                    this.createForm = [];
                    this.$emit("import-success");
                });
        },
        //文件上传成功
        upSuccess({ results, header }) {
            console.log("results:", results, header);

            //检验表头
            let reHead = [];
            if (localStorage.lang == "cn") {
                reHead = [
                    "空调名称",
                    "空调序列号*",
                    "空调类型*",
                    "网关mac*",
                    "网关IMEI*",
                ];
            } else if (localStorage.lang == "en") {
                reHead = [
                    "name",
                    "serialno*",
                    "type*",
                    "mac*",
                    "imei*",
                ];
            }
            
            for (let j = 0; j < reHead.length; j++) {
                if (reHead[j] != header[j]) {
                    this.$message({
                        showClose: true,
                        message: this.$t("lang.valid-temp"),
                        type: "error"
                    });
                    return;
                }
            }
            if(results.length == 0){
                this.$message({
                        showClose: true,
                        message: this.$t("lang.empty-result"),
                        type: "warning"
                    });
            }
            for (let i = 0; i < results.length; i++) {
                //检查
                let result = this.check(results[i], i, header);

                this.createForm.push({
                    name: result[header[0]],
                    serialno: result[header[1]],
                    dt_id: result[header[2]],
                    mac: result[header[3]],
                    imei: result[header[4]],
                    // iotsim: result[header[5]],
                    // byterate: result[header[6]],
                    // protocol: result[header[7]]
                });
                this.upPercentage = ((i + 1) / results.length) * 100;
            }
        },
        //检查
        check(result, i, header) {
            console.log("InNewData", JSON.parse(JSON.stringify(result)));

            let oneData = JSON.parse(JSON.stringify(result));

            //undefined 置空
            for (let j = 0; j < header.length; j++) {
                if (oneData[header[j]] == undefined) {
                    oneData[header[j]] = "";
                }
            }

            //非空检查
            for (let j = 1; j <= 4; j++) {
                if (oneData[header[j]] == "") {
                    this.errorNote =
                        this.errorNote +
                        "<br>" +
                        this.$t("lang.article") +
                        (i + 1) +
                        this.$t("lang.add-error") +
                        header[j] +
                        this.$t("lang.not-null");
                }
            }
            //空调名称字符长度检查
            if (oneData[header[0]].length > 50) {
                this.errorNote =
                    this.errorNote +
                    "<br>" +
                    this.$t("lang.article") +
                    (i + 1) +
                    this.$t("lang.add-error") +
                    header[0] +
                    this.$t("lang.over-50");
            }
            //序列号字符长度检查
            if (oneData[header[1]].length > 100) {
                this.errorNote =
                    this.errorNote +
                    "<br>" +
                    this.$t("lang.article") +
                    (i + 1) +
                    this.$t("lang.add-error") +
                    header[1] +
                    this.$t("lang.over-100");
            }
            //网关MAC字符长度检查
            if (oneData[header[3]].length > 100) {
                this.errorNote =
                    this.errorNote +
                    "<br>" +
                    this.$t("lang.article") +
                    (i + 1) +
                    this.$t("lang.add-error") +
                    header[3] +
                    this.$t("lang.over-100");
            }
            //网关IMEI字符长度检查
            if (oneData[header[4]].length > 100) {
                this.errorNote =
                    this.errorNote +
                    "<br>" +
                    this.$t("lang.article") +
                    (i + 1) +
                    this.$t("lang.add-error") +
                    header[4] +
                    this.$t("lang.over-100");
            }
            // //物联网卡字符长度检查
            // if (oneData[header[5]].length > 50) {
            //     this.errorNote =
            //         this.errorNote +
            //         "<br>" +
            //         this.$t("lang.article") +
            //         (i + 1) +
            //         this.$t("lang.add-error") +
            //         header[5] +
            //         this.$t("lang.over-50");
            // }
            //类型检查
            let tagT = 0;
            for (let j = 0; j < this.typeArr.length; j++) {
                
                if (oneData[header[2]] == this.typeArr[j].name) {
                    oneData[header[2]] = this.typeArr[j].id;
                    tagT = 1;
                    break;
                }
            }
            if (tagT == 0) {
                this.errorNote =
                    this.errorNote +
                    "<br>" +
                    this.$t("lang.article") +
                    (i + 1) +
                    this.$t("lang.add-error") +
                    header[2] +
                    this.$t("lang.no-exist");
            }
            //网关波特率检查
            // let tagB = 0;
            // if (oneData[header[6]] == "") {
            //     tagB = 1;
            // } else {
            //     for (let j = 0; j < this.baudOptions.length; j++) {
            //         if (oneData[header[6]] == this.baudOptions[j].value) {
            //             tagB = 1;
            //             break;
            //         }
            //     }
            // }
            // if (tagB == 0) {
            //     this.errorNote =
            //         this.errorNote +
            //         "<br>" +
            //         this.$t("lang.article") +
            //         (i + 1) +
            //         this.$t("lang.add-error") +
            //         header[6] +
            //         this.$t("lang.value-false");
            // }
            // //网关接入协议错误
            // let tagP = 0;
            // if (oneData[header[7]] == "") {
            //     tagP = 1;
            // } else {
            //     for (let j = 0; j < this.protocolOptions.length; j++) {
            //         if (oneData[header[7]] == this.protocolOptions[j].name) {
            //             oneData[header[7]] = this.protocolOptions[j].value;
            //             tagP = 1;
            //             break;
            //         }
            //     }
            // }
            // if (tagP == 0) {
            //     this.errorNote =
            //         this.errorNote +
            //         "<br>" +
            //         this.$t("lang.article") +
            //         (i + 1) +
            //         this.$t("lang.add-error") +
            //         header[7] +
            //         this.$t("lang.value-false");
            // }
            return oneData;
        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (isLt1M) {
                this.upPercentage = 0;
                this.createpercentage = 0;
                this.isCreate = false;
                this.errorNote = "";
                this.createForm = [];
                return true;
            }
            this.$message({
                message: this.$t("lang.over-1MB"),
                type: "warning"
            });
            return false;
        },
        //获取设备类型
        getType() {
            if (this.typeArr.length != 0) return;
            this.$api.restfulApi.list("devicetype").then(res => {
                this.typeArr = res.data;
                console.log("type", res);
            });
        },
        ////下载模板
        downloadTemp() {
            let params = { lang: localStorage.lang };
            
            axios.get("/api/downloadExcel/", { params: params }).then(res => {
                console.log(res);
                let url = res.base_path
                let btn = document.createElement("a");
                    btn.setAttribute('download',res.file_name);
                    btn.setAttribute('href',url);
                    btn.click();
                    btn.remove();
            });
        }
    }
};
</script>

<style lang="scss">
.up-box {
    position: relative;
    .tip {
        text-align: center;
        font-size: 12px;
        color: #a8a8a8;
        padding: 5px 0;
    }
    .el-progress {
        position: absolute;
        top: -3px;
        left: 450px;
    }
}
</style>