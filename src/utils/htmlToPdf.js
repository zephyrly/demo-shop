// utils/htmlToPdf.js：导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
    install(Vue, options) {
        // id-导出pdf的div容器；title-导出文件标题
        Vue.prototype.htmlToPdf = (id, title) => {
            const element = document.getElementById(`${id}`)
            const opts = {
                scale: 12, // 缩放比例，提高生成图片清晰度
                useCORS: true, // 允许加载跨域的图片
                allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
                tainttest: true, // 检测每张图片已经加载完成
                logging: true, // 日志开关，发布的时候记得改成 false
                backgroundColor: null, // 背景颜色
                dpi: 192, // 将分辨率提高到特定的dpi,默认值为96
                scale: 2, // 用于渲染的比例尺。默认为浏览器设备像素比率。默认值是1，手机端设置成2
                useCORS: true, // 是否尝试使用CORS从服务器加载图像
            }

            html2Canvas(element, opts)
                .then((canvas) => {
                    let contentWidth = canvas.width
                    let contentHeight = canvas.height
                    // 一页pdf显示html页面生成的canvas高度;
                    let pageHeight = (contentWidth / 592.28) * 841.89
                    // 未生成pdf的html页面高度
                    let leftHeight = contentHeight
                    // 页面偏移
                    let position = 0
                    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                    let imgWidth = 595.28
                    let imgHeight = (592.28 / contentWidth) * contentHeight
                    let pageData = canvas.toDataURL('image/jpeg', 1.0)

                    // a4纸纵向，一般默认使用；new JsPDF('landscape'); 横向页面
                    let PDF = new JsPDF('', 'pt', 'a4')

                    // 当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
                        PDF.addImage(
                            pageData,
                            'JPEG',
                            0,
                            0,
                            imgWidth,
                            imgHeight
                        )
                    } else {
                        // 超过一页时，分页打印（每页高度841.89）
                        while (leftHeight > 0) {
                            PDF.addImage(
                                pageData,
                                'JPEG',
                                0,
                                position,
                                imgWidth,
                                imgHeight
                            )
                            leftHeight -= pageHeight
                            position -= 841.89
                            if (leftHeight > 0) {
                                PDF.addPage()
                            }
                        }
                    }
                    PDF.save(title + '.pdf')
                })
                .catch((error) => {
                    console.log('打印失败', error)
                })
        }
    },
}
