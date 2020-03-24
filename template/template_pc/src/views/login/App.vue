<template>
    <div class="content">
        <div class="head">
            <div class="head-logo">
                <div class="logo-img">
                    <img src="@/assets/images/head/logo.png" class="logo" alt />
                    <div v-if="lang=='cn'" class="text">{{$t('lang.login-title')}}</div>
                </div>
                <!-- <div class="logo-title">
                    <p style="letter-spacing: 3px;">GCHV {{$t('lang.zhigao')}}</p>
                    <p
                        style="font-weight: 800; font-size: 16px; letter-spacing: 6px;"
                    >{{$t('lang.login-title')}}</p>
                </div>-->
            </div>
            <div class="head-rigth">
<!--               <div class="download">-->
<!--                    <button round class="btn1" @click="dialogVisible = true">{{$t('lang.download-ios')}}</button>-->
<!--                    <button round>{{$t('lang.download-android')}}</button>-->
<!--                </div>-->
                <sel-language></sel-language> 
            </div>
            
        </div>
        <router-view />
        <footer-nav></footer-nav>
        <el-dialog :title="$t('lang.install-ios')"
                   class="tip"
                   :visible.sync="dialogVisible"
                   >
            <h1>{{$t('lang.ios-tip')}}</h1>
            <p>1.{{$t('lang.tip-first')}}</p>
            <img src="@/assets/images/tip/1.jpg" alt="">
            <p>2.{{$t('lang.tip-second')}}</p>
            <img src="@/assets/images/tip/2.png" alt="">
            <p>3.{{$t('lang.tip-third')}}</p>
            <img src="@/assets/images/tip/3.png" alt="">
            <p>4.{{$t('lang.tip-fourth')}}</p>
            <img src="@/assets/images/tip/4.jpg" alt="">
            <p>5.{{$t('lang.tip-fifth')}}</p>
            <img src="@/assets/images/tip/5.jpg" alt="">
            <p>6.{{$t('lang.tip-sixth')}}</p>
            <img src="@/assets/images/tip/6.png" alt="">
        </el-dialog>
    </div>
</template>

<script>
import Language from "@/components/Language";
import Footer from "@/components/Footer";
export default {
    data() {
        return {
            dialogVisible: false
        };
    },
    computed: {
        lang: function() {
            return this.$i18n.locale;
        }
    },
    created() {},
    components: {
        "sel-language": Language,
        "footer-nav": Footer
    },
    methods: {}
};
</script>

<style lang="scss" rel="stylesheet/sass">
.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: -webkit-fill-available;
}
.head {
    height: 70px;
    width: 100%;
    background: #1a202e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    .head-logo {
        display: flex;
        align-items: center;
        width: 120px;
        height: 70px;
        .logo-img {
            .text {
                color: #ffffff;
                font-size: 13px;
                font-weight: 300;
                margin-top: 2px;
            }
            img {
                width: 120px;
                height: 30px;
            }
        }
        .logo-title {
            width: 160px;
            height: 40px;
            color: #fff;
        }
    }
    .head-rigth{
        display: flex;
        align-items: baseline;
       .download{
        margin-right: 10px;
        button{
            background: #1a202e;
            color: #fff;
            padding: 6px 10px;
            border: 1px solid #fff;
            border-radius: 18px;
            font-size: 12px;
            outline: none;
        }
        .btn1{
            margin-right: 8px;
        }
    }  
    }
   
}
    .tip{
        p{
            margin: 12px 0;
        }
    }
</style>