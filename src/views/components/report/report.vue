<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="main" style="width: 750px;height:400px;"></div>
        </el-card>
        <!--传入include数组-->
        <el-button type="primary" @click="goUser" style="float:left">goUser</el-button>
        <el-button type="primary" @click="turnPDF" style="float:left">turnPDF</el-button>
    </div>
</template>

<script>
// 1. 导入 echarts
import echarts from 'echarts'
import _ from 'lodash'
import { getReportList } from '@/api/report'

export default {
    data() {
        return {
            // 需要合并的数据
            options: {
                title: {
                    text: '用户来源',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#E9EEF3',
                        },
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        boundaryGap: false,
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
            },
        }
    },
    created() {},
    // 此时，页面上的元素，已经被渲染完毕了！
    async mounted() {
        // 3. 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'))

        const res = await getReportList()
        console.log(res)
        if (res.meta.status !== 200) {
            return this.$message.error('获取折线图数据失败！')
        }

        // 4. 准备数据和配置项
        const result = _.merge(res.data, this.options)

        // 5. 展示数据
        myChart.setOption(result)
    },
    methods: {
      goUser(){
        this.$router.push({ path: "/users" });
      },
    //   turnPDF(){
    //   // 滚动到顶部，确保打印内容完整
    //   document.body.scrollTop = 0; // IE的
    //   document.documentElement.scrollTop = 0; // 其他
    //   this.htmlToPdf("pdfDom", "统计报告");
    //   },
      turnPDF() {
            // 滚动到顶部，确保打印内容完整
            let element = document.getElementById(`pdf`)
            let w = element.width();
            let h = element.height();
            let offsetTop = element.offset().top;
            let offsetLeft = element.offset().left;
            let canvas = document.createElement('canvas');
            let abs = 0;
            let position = 0;
            let win_i = $(window).width();
            let win_o = window.innerWidth;
            if (win_o > win_i) {
                abs = (win_o - win_i) / 2;
            }
            canvas.width = w * 2;
            canvas.height = h * 2;
            let context = canvas.getContext("2d");
            context.scale(2, 2);
            context.translate(-offsetLeft - abs, -offsetTop);
            html2canvas(element,{
                onrendered:function (canvas) {
                    let contentWidth = canvas.width;
                    let contentHeight = canvas.height;
                    let pageHeight = contentHeight / 592.28 * 841.89;
                    let leftHeight = contentHeight;
                    let imgWidth = 595.28;
                    let imgHeight = 592.28 / contentWidth * contentHeight*1.5;
                    let pageData = canvas.toDataURL('image/jpeg', 1.0);
                    let pdf = new jsPDF('', 'pt', 'a4');
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    } else {
                        while (leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            if (leftHeight > 0) {
                                pdf.addPage();
                            }
                        }
                    }
                    document.getElementById("iframe123").src = pdf.output('datauristring');
                },background: '#FFF'
            })
        
        },
    },
}
</script>

<style lang="less" scoped></style>
