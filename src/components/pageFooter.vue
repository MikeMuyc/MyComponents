<template>
    <footer>
        <ul class="footer-left">
            <li>
                <span>宁波市公安局网络教育训练平台是宁波市公安局在线教育培训平台</span>
            </li>
            <li>
                <a href="#">关于我们</a>
                <a href="#">联系我们</a>
                <a href="#">帮助中心</a>
            </li>
            <li>
                <i class="icon-badge" :style="iconBadgeStyle"></i>
                <span>宁波市公安局版权所有</span>
            </li>
        </ul>
        <div class="footer-right">
            <h5>宁波公安官方微信</h5>
            <img :src="codePng" title="宁波公安官方微信" alt="宁波公安官方微信"/>
        </div>
    </footer>
</template>

<script>
    import codePng from 'assets/code.png'
    import badge from 'assets/badge.png'
    export default {
        name: "pageFooter",
        data() {
            return {
                codePng: codePng,
                iconBadgeStyle: {
                    backgroundImage:  "url(" + badge + ")"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        overflow: hidden;
        padding: 20px calc(6% - 18px) 20px;
        height: 150px;
        background-color: #f4f7fc;
        display: flex;
        color: #666;
        .footer-left {
            flex: 1;
            margin-top: 18px;
            font-size: 0;
            li {
                margin-bottom: 18px;
                a {
                    margin-right: 24px;
                    font-size: 12px;
                    color: #666;
                }
                span {
                    font-size: 12px;
                }
                &:last-of-type {
                    margin-bottom: auto;
                }
                .icon-badge {
                    display: inline-block;
                    margin-right: 6px;
                    width: 18px;
                    height: 18px;
                    background-size: 18px 18px;
                    vertical-align: top;
                }
            }
        }
        .footer-right {
            flex: 0 0 120px;
            text-align: right;
            h5 {
                font-weight: normal;
                font-size: 12px;
            }
        }
    }
</style>