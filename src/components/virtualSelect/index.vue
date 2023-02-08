<template>
    <el-select
        ref="elSelectRef"
        v-model="proxyValue"
        :filter-method="selectFilter"
        v-bind="$attrs"
        v-on="$listeners"
        @visible-change="handleVisible"
    >
        <li class="start" />
        <template v-for="(item, i) in optionsDuplicate">
            <el-option
                v-if="isRender(i)"
                ref="elOptionItem"
                :key="item.value + i"
                :label="item.label"
                :value="item.value"
            />
        </template>
        <li class="end" style="padding-bottom:20px"/>
    </el-select>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
// 列表最大渲染总数
const maxRender = 60
// 超出后更新的列数。比如第一屏到底之后，会删掉前30条并最后补30条
const refreshRender = 30
let listItemHeight = 34, // 默认每项list高度
fatherUlDomNormalPaddingTop = 6 // 默认下拉ul的paddingTop

export default {
    name: 'BaseSelect',
    props: {
        options: {
            type: Array,
            default() {
                return []
            },
        },
        value: {
            type: [String, Array, Number],
            default() {
                return []
            },
        },
    },
    data() {
        return {
            observer: Object.create(null),
            startIndex: 0,
            optionsDuplicate: [],
            fatherUlDom: Object.create(null),
        }
    },
    created() {
        // for (let i = 0; i < 10000; i++) {
        //       this.options.push({
        //           id: i,
        //           name: '上海' + i + i,
        //       })
        //   }
        // this.optionsDuplicate = cloneDeep(this.options)
        
    },
    computed: {
        proxyValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            },
        },
        // 判断当前项是否符合插入DOM的条件
        isRender() {
            return (i) => i >= this.startIndex && i < this.endIndex
        },
        // 通过startIndex + 一屏渲染数计算当前最大显示的index
        endIndex() {
            return this.startIndex + maxRender
        },
    },
    watch: {
        options: {
            handler(newval, oldval) {
                this.optionsDuplicate = cloneDeep(newval)
                console.log('this.optionsDuplicate123', this.optionsDuplicate)
                this.$nextTick((_) => this.handleVisible(true))
            },
            immediate: true,
        },
    },
    methods: {
        selectFilter(enterStr) {
            this.initData()
            if (!enterStr) {
                this.optionsDuplicate = this.options
                return
            }
            this.optionsDuplicate = this.options.filter((item) =>
                item.label.includes(enterStr)
            )
        },
        handleVisible(isVisible) {
            if (!isVisible || !this.$refs.elOptionItem) {
                this.observer.disconnect && this.observer.disconnect()
                return
            }

            this.initData().initObserve()
        },
        initData() {
            this.startIndex = 0
            this.fatherUlDom.style &&
                (this.fatherUlDom.style.paddingTop =
                    fatherUlDomNormalPaddingTop + 'px')

            return this
        },
        initObserve() {
            this.$nextTick(() => {
                const listDomVm = this.$refs.elOptionItem[0]
                if (!listDomVm) return

                const listDom = this.$refs.elOptionItem[0].$el
                listItemHeight = listDom.offsetHeight || listItemHeight
                this.fatherUlDom = listDom.parentElement
                fatherUlDomNormalPaddingTop =
                    parseFloat(
                        window.getComputedStyle(this.fatherUlDom).paddingTop
                    ) || fatherUlDomNormalPaddingTop
                // 在elSelect实例中找到下拉的DOM
                const dropDownDomVm = this.$refs.elSelectRef.$children.find(
                    (_) => _.$el.className.includes('el-select-dropdown')
                )
                if (!dropDownDomVm) return
                const dropDownDom = dropDownDomVm.$el
                // 获取开始和结尾的<li>的DOM
                const [startDom, endDom] = [
                    dropDownDom.querySelector('.start'),
                    dropDownDom.querySelector('.end'),
                ]
                console.log(endDom)
                // IntersectionObserver实现观测首、尾元素是否进入可视区
                this.observer = new IntersectionObserver((entries) => {
                    if (entries.length >= 2) return // 避免在元素交替删除的瞬间，start、end同时进入可视区导致出现逻辑问题
                    const dom = entries[0] // 取出第一个做判断
                    if (!dom.isIntersecting) return
                    console.log(dom.intersectionRatio, dom)
                    if (dom.target === endDom) {
                        // 向下滚动
                        console.log('first', this.startIndex)
                        const resultIndex = this.startIndex + refreshRender
                        // 通过变更starIndex来触发computed中的endIndex和isRender来更改当前可渲染的DOM
                        this.startIndex =
                            resultIndex > this.optionsDuplicate.length
                                ? this.startIndex
                                : resultIndex
                        console.log('second', this.startIndex)
                    } else {
                        // 向上滚动
                        const resultIndex = this.startIndex - refreshRender
                        this.startIndex = resultIndex < 0 ? 0 : resultIndex
                    }
                    // 计算顶部的padding以撑开内容。用当前startIndex * 每个list的高度 + 初始Ul的padding
                    this.fatherUlDom.style.paddingTop =
                        this.startIndex * listItemHeight +
                        fatherUlDomNormalPaddingTop +
                        'px' // 填充高度
                })
                this.observer.observe(startDom)
                this.observer.observe(endDom)
            })
        },
    },
}
</script>
