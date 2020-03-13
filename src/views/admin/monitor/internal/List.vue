<template>
    <div class="in-list">
        <el-form
            label-width="80px"
            label-position="left"
            :rules="tempRules"
            :model="tempForm"
            ref="tempForm"
        >
            <el-form-item :label="$t('lang.powerState')" v-if="power!=undefined">
                <!-- 本机开机状态 -->
                <el-switch
                    v-model="power"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changePower()"
                    :disabled="notDoing['power']"
                ></el-switch>
                <!-- 本机温度 -->
                <span class="ben-t" v-if="params.temperature!=undefined">{{params.temperature}}°C</span>
            </el-form-item>
             <el-form-item :label="$t('lang.bai-ud')" v-if="swingflap_ud!=undefined">
                <el-switch
                    v-model="swingflap_ud"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeswingflap_ud()"
                    :disabled="((power?false:true) || notDoing['swingflap_ud'])"
                ></el-switch>
            </el-form-item>
            <el-form-item :label="$t('lang.bai-rl')" v-if="swingflap_rl!=undefined">
                <el-switch
                    v-model="swingflap_rl"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeswingflap_rl()"
                    :disabled="((power?false:true) || notDoing['swingflap_rl'])"
                ></el-switch>
            </el-form-item>
            <el-form-item :label="$t('lang.in-temperature1')" v-if="params.temperature1!=undefined">
                <!-- 室内温度 -->
                <span class="home-t">{{params.temperature1}}°C</span>
            </el-form-item>
            <!-- 模式 -->
            <el-form-item :label="$t('lang.in-runMode')" v-if="modeValue!=undefined">
                <el-select v-model="modeValue" @change="changeRunMode" :disabled="((power?false:true) || notDoing['model'])">
                    <el-option
                        v-for="item in runModeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 风量 -->
            <el-form-item :label="$t('lang.windStatus')" v-if="windLevel!=undefined">
                <el-select v-model="windLevel" @change="changeWind" :disabled="((power?false:true) || notDoing['wind'])">
                    <el-option
                        v-for="item in windStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 温度设置 -->
            <el-form-item
                :label="$t('lang.temperatureSet')"
                prop="temperatureSet"
                v-if="params.temperatureSet!=undefined"
            >
                <el-input
                    v-model="tempForm.temperatureSet"
                    @input="changeTemp"
                    :disabled="((power?false:true) || notDoing['temperature'])"
                ></el-input>
            </el-form-item>
            <!-- 辅助功能 -->
            <!-- <el-form-item :label="$t('lang.aidStatus')">
                <el-select v-model="params.aidStatus">
                    <el-option
                        v-for="item in aidStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>-->
            <!-- 故障状态 -->
            <el-form-item :label="$t('lang.faultStatus')" v-if="params.faultStatus!=undefined">
                <div class="fault-s">
                    <span v-if="params.faultStatus.length==0" style="color:#999999">无</span>
                    <span
                        v-for="(item,index) in params.faultStatus"
                        :key="index"
                    >{{item.code}}:{{item.message}}&nbsp;&nbsp;</span>
                </div>
            </el-form-item>
            <!-- 保护状态 -->
            <el-form-item
                :label="$t('lang.protectionStatus')"
                v-if="params.protectionStatus!=undefined"
            >
                <div class="green-color">
                    <span v-if="params.protectionStatus.length==0" style="color:#999999">无</span>
                    <span
                        v-for="(item,index) in params.protectionStatus"
                        :key="index"
                    >{{item.code}}:{{item.message}}&nbsp;&nbsp;</span>
                </div>
            </el-form-item>
            <el-form-item>
                <el-row class="text-box">
                    <div class="text" v-if="params.expansion1!=undefined">
                        <p>{{$t('lang.expansion1')}}</p>
                        <p class="green-color">{{params.expansion1==0?$t('lang.on'):$t('lang.off')}}</p>
                    </div>
                    <div class="text" v-if="params.expansion2!=undefined">
                        <p>{{$t('lang.expansion2')}}</p>
                        <p class="green-color">{{params.expansion1==0?$t('lang.on'):$t('lang.off')}}</p>
                    </div>
                    <div class="text" v-if="params.frequency!=undefined">
                        <p>{{$t('lang.frequency')}}</p>
                        <p class="green-color">{{params.frequency}}HZ</p>
                    </div>
                    <div class="text" v-if="params.current!=undefined">
                        <p>{{$t('lang.current')}}</p>
                        <p class="green-color">{{params.current}}A</p>
                    </div>
                    <div class="text" v-if="params.temperature3!=undefined">
                        <p>{{$t('lang.temperature3')}}</p>
                        <p class="green-color">{{params.temperature3}}°C</p>
                    </div>
                    <div class="text" v-if="params.temperature2A!=undefined">
                        <p>{{$t('lang.temperature2A')}}</p>
                        <p class="green-color">{{params.temperature2A}}°C</p>
                    </div>
                    <div class="text" v-if="params.powerNeed!=undefined">
                        <p>{{$t('lang.powerNeed')}}</p>
                        <p class="green-color">{{$t('lang.actual-need')}}X{{params.powerNeed}}</p>
                    </div>

                    <div class="text" v-if="params.temperature2B!=undefined">
                        <p>{{$t('lang.temperature2B')}}</p>
                        <p class="green-color">{{params.temperature2B}}°C</p>
                    </div>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: ["paramList"],
    data() {
        var slotValidate = (rule, value, callback) => {
            if (value === "") {
                return callback(new Error(this.$t("lang.hint-tempNull")));
            }
            if (isNaN(value)) {
                return callback(new Error(this.$t("lang.hint-num")));
            }
            if (value < 16 || value > 32) {
                return callback(new Error(this.$t("lang.hint-temprang")));
            } else {
                return callback();
            }
        };
        return {
            //模式
            params: {
                runMode: {},
                windStatus: {}
            },
            
            runModeList: [],
            modeValue: undefined, //处理模式选择出现的bug
            power: undefined, //处理运行状态
            windLevel: undefined, //处理风量
            //摆风
            swingflap_rl:undefined,
            swingflap_ud:undefined,

            //判断某功能是否正在发送指令
            notDoing:{
                'power':false,
                'swingflap_rl':false,
                'swingflap_ud':false,
                'model':false,
                'wind':false,
                'temperature':false,
            },
            //风量
            windStatusList: [
                { label: this.$t("lang.hight"), value: 1 },
                { label: this.$t("lang.middle"), value: 2 },
                { label: this.$t("lang.low"), value: 4 },
                { label: this.$t("lang.wind-auto"), value: 8 }
            ],
            //辅助功能
            aidStatusList: [
                { label: this.$t("lang.in-Bit15"), value: "Bit15" },
                { label: this.$t("lang.in-Bit14"), value: "Bit14" },
                { label: this.$t("lang.in-Bit13"), value: "Bit13" },
                { label: this.$t("lang.in-Bit12"), value: "Bit12" },
                // { label: this.$t("lang.in-Bit11"), value: "Bit11" },
                { label: this.$t("lang.in-Bit10"), value: "Bit10" },
                { label: this.$t("lang.in-Bit9"), value: "Bit9" },
                { label: this.$t("lang.in-Bit8"), value: "Bit8" },
                { label: this.$t("lang.in-Bit7"), value: "Bit7" },
                { label: this.$t("lang.in-Bit6"), value: "Bit6" },
                { label: this.$t("lang.in-Bit5"), value: "Bit5" },
                { label: this.$t("lang.in-Bit4"), value: "Bit4" },
                { label: this.$t("lang.in-Bit3"), value: "Bit3" },
                { label: this.$t("lang.in-Bit2"), value: "Bit2" },
                { label: this.$t("lang.in-Bit1"), value: "Bit1" },
                { label: this.$t("lang.in-Bit0"), value: "Bit0" }
            ],
            //温度设置相关
            tempForm:{
                temperatureSet:''
            },
            tempRules: {
                temperatureSet: [
                    {
                        validator: slotValidate,
                        trigger: "change"
                    }
                ]
            },

        };
    },
    watch: {
        paramList: {
            handler(newVal, oldVal) {
                this.runModeList = [];
                this.modeValue = "";
                this.windLevel = undefined;
                this.params = {};
                this.swingflap_rl = undefined;
                this.swingflap_ud = undefined;

                this.power = undefined;
                // console.log("InNewData", JSON.parse(JSON.stringify(newVal)));
                // JavaScript 中对象和数组是通过引用传入的
                // 所以为了不影响prop传来的对象或数组值，需做如下处理
                // 把this.paramList转换成字符串
                // console.log("paramList",Object.keys(newVal));
                
                if (Object.keys(newVal).length!=0) {
                    this.params = JSON.parse(JSON.stringify(newVal));
                    this.handleData(this.params)
                }
            },
            deep: true,
            immediate: true
        },
    },
    created() {
        this.getListen();
    },
    methods: {
        //监听数据
        getListen() {
            this.$doudou.listen("internal_controlconfirm", data => {
                //console.log("listen", data);
                if (data.internal_id == this.paramList.internal_id && this.$route.name == 'device_monitorBasis') {
                    this.$message({
                        message: "控制成功！",
                        type: "success"
                    });
                    for(let key in this.notDoing){
                            this.notDoing[key]=false;
                    }
                }
            });

            this.$doudou.listen('internal_anchor', data => {
                //console.log("internal", data)
                if(data.internal_id == this.paramList.internal_id && this.$route.name == 'device_monitorBasis'){
                    console.log('-----diff-----',this.diff(this.params,data))
                    if(this.diff(this.params,data)){
                        console.log('change-success--',data)
                        this.params = data
                        this.handleData(this.params)
                    }
                }
            })
        },
        //数据处理
        handleData(params){
            //处理运转模式
            let runMode = params.runMode;
            let i = 0;
            if (runMode) {
                Object.keys(runMode).forEach(key => {
                    if (key != "power") {
                        this.runModeList[i] = {
                            label: this.$t("lang.mode-" + key + ""),
                            value: key
                        };
                        if (runMode[key] == 1) {
                            this.modeValue = key; //设置this.params.modeValue,出现下拉选择出现bug
                        }
                        i++;
                    } else {
                        this.power = runMode[key];
                    }
                });
            }
            //风量处理
            if (params.windStatus) {
                
                if (params.windStatus.level == 0) {
                    this.windLevel = "";
                } else {
                    this.windLevel = params.windStatus.level;
                }
            }
            //辅助功能之摆风处理
            this.swingflap_rl=params.assistState.swing;
            this.swingflap_ud=params.assistState.verticalSwing;

            //温度处理
            this.tempForm.temperatureSet=params.temperatureSet;
        },

        //温度控制
        changeTemp() {
            // console.log(this.params.temperatureSet)
            this.$refs.tempForm.validate(valid => {
                if (!valid) return;
                this.handleNotDoing('temperature');
                this.changeControl({ temperature: this.tempForm.temperatureSet });
            });
        },
        //模式控制
        changeRunMode(val) {
            let param = {};
            if (this.modeValue == "auto") {
                param = {
                    runMode: 0
                };
            } else if (this.modeValue == "cold") {
                param = {
                    runMode: 1
                };
            } else if (this.modeValue == "heating") {
                param = {
                    runMode: 2
                };
            } else if (this.modeValue == "dehumidification") {
                param = {
                    runMode: 3
                };
            } else if (this.modeValue == "wind") {
                param = {
                    runMode: 4
                };
            }
            this.handleNotDoing('model');
            this.changeControl(param);
        },
        //风量控制
        changeWind(val) {
            // console.log(this.params.windStatus.level);
            this.handleNotDoing('wind');
            this.changeControl({ windSpeed: this.windLevel });
        },
        //左右摆风
        changeswingflap_rl(){
            let param={
                swingflap_rl:this.swingflap_rl
            }
            this.handleNotDoing('swingflag_rl');
            this.changeControl(param);
        },
        //上下摆风
        changeswingflap_ud(){
            let param={
                swingflap_ud:this.swingflap_ud
            }
            this.handleNotDoing('swingflag_ud');
            this.changeControl(param);
        },
        //开关控制
        changePower() {
            // console.log(this.params.powerState);
            let param = {
                power: this.power
            };
            this.handleNotDoing('power');
            this.changeControl(param);
        },
        changeControl(param) {
            let baseParam = {
                id: this.paramList.internal_id,
                type: 1
            };
            this.$api.restfulApi
                .post("internal/control", Object.assign(baseParam, param))
                .then(() => {
                    console.log("成功");
                });
        },
        //指令处理中禁止发送指令
        handleNotDoing(name){
            for(let key in this.notDoing){
                this.notDoing[key]=true;
                // if(key!=name){
                    
                // }else{
                //     this.notDoing[key]=false;
                // }
            }
        },
        //判断下发指令后数据是否更新
        diff(params,data){
            if(params.runMode.power!=data.runMode.power) return true

            // if((params.aidState & (1<<2)) != (data.aidState & (1<<2))) return true

            for(let key in params.runMode){
                if(key!='power'){
                    if(params.runMode[key]!=data.runMode[key]) return true
                }
            }

            if(params.windStatus.level!=data.windStatus.level) return true
            if(params.assistState.swing != data.assistState.swing) return true
            if(params.assistState.verticalSwing != data.assistState.verticalSwing) return true
            if(params.temperatureSet!=data.temperatureSet) return true

            return false
        },
    }
};
</script>
<style lang="scss">
@media screen {
    .in-list {
        .el-form-item__label {
            font-size: 16px;
            @media (max-width: 1280px) {
                font-size: 13px;
            }
        }
        .el-form-item__error {
            white-space: nowrap;
        }
        .ben-t {
            padding: 0 25px;
        }

        .fault-s {
            color: #ec4343;
        }
        .green-color {
            color: #43d197;
        }
        .text-box {
            width: 350px;
            display: flex;
            flex-wrap: wrap;
            .text {
                padding: 20px 30px;
                padding-left: 0;
                p {
                    line-height: 22px;
                }
            }
        }
    }
}
</style>