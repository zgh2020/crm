<template>
    <div class="img-box">
        <div class="image_show_box" ref="imgShowBox">
            <div :style="{
                left: `${imgStyle.left}px`,
                top: `${imgStyle.top}px`,
                transform: `scale(${imgStyle.scale}, ${imgStyle.scale}) rotate(${imgStyle.deg}deg)`
                }"
                    @mousewheel.stop.prevent="handleMouseWheel"
                    class="drag_container"
                    ref="dragContainer"
                    v-show="!isReadingMode">
                <img :src="imgUrl" :style="{
                    height: imgStyle.height,
                    width: imgStyle.width,
                  }"
                        @mousedown.stop.prevent="handleMouseDown"
                        draggable="false"
                        ref="img"/>
            </div>
            <div class="flip_book" v-show="isReadingMode">
                <div class="flip_book_bg">
                    <img :src="images[0]?images[0].url:null" class="flip_book_img" id="flipBook"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isReadingMode: !!this.initialReadingMode,
      isSuitableSize: !!this.initialSuitableSize,
      hadCached: [],
      imgIndex: 0,
      imgUrl: '',
      imgStyle: {
        scale: 1,
        deg: 0,
        top: 0,
        left: 0,
        height: 'auto',
        width: 'auto'
      },
      readingModeWidth: 0,
      readingModeHeight: 0,
      // 鼠标坐标
      mousePoint: {
        x: 0,
        y: 0
      },
      images: []
    }
  },
  props: {
    initialReadingMode: Boolean,
    initialSuitableSize: Boolean
  },
  methods: {
    init () {
      // 有默认值传显示默认值，没有默认值，显示照片集第一张
      // const tmpData = { ...this.data }
      // this.dealData(tmpData)

      // this.imgIndex = this.images ? 0 : -1
      this.$refs.img.onload = this.resetData
      this.$nextTick(() => {
        this.imgUrl = this.images.length > 0 ? this.images[0].url : null
        const img = document.getElementById('flipBook')
        if (img) {
          if (img.complete) {
            initTurn.call(this, img, this.images.length)
          } else {
            img.onload = () => {
              initTurn.call(this, img, this.images.length)
            }
          }
        }
      })
    },
    prev () {
      if (this.images.length > 0) {
        if (this.imgIndex <= 0) {
          this.imgIndex = this.images.length - 1
        } else {
          this.imgIndex--
        }
        this.imgUrl = this.images[this.imgIndex].url
        this.$emit(
          'handleMenuEvent',
          'setCurrentKey',
          this.images[this.imgIndex].id
        )
        this.$emit('handleMenuEvent', 'changeInputValue', this.imgIndex + 1)
        this.$nextTick(function () {
          if (!this.hadCached.includes(this.imgIndex + 1)) {
            const prevImg = document.createElement('img')
            prevImg.src = this.images[this.imgIndex].url
            prevImg.className = 'flip_book_img'
            const element = window.$('<div  class="flip_book_bg"/>').html(prevImg)
            window.$('.flip_book').turn('addPage', element, this.imgIndex + 1)
            this.hadCached.push(this.imgIndex + 1)
          }
          window.$('.flip_book').turn('page', this.imgIndex + 1)
        })
      }
    },
    next () {
      if (this.images.length > 0) {
        if (this.imgIndex >= this.images.length - 1) {
          this.imgIndex = 0
        } else {
          this.imgIndex++
        }
        this.imgUrl = this.images[this.imgIndex].url
        this.$emit(
          'handleMenuEvent',
          'setCurrentKey',
          this.images[this.imgIndex].id
        )
        // 触发菜单选中
        this.$emit('handleMenuEvent', 'changeInputValue', this.imgIndex + 1)
        // 改变当前页码
        this.$nextTick(function () {
          if (!this.hadCached.includes(this.imgIndex + 1)) {
            const nextImg = document.createElement('img')
            nextImg.src = this.images[this.imgIndex].url
            nextImg.className = 'flip_book_img'
            const element = window.$('<div  class="flip_book_bg"/>').html(nextImg)
            window.$('.flip_book').turn('addPage', element, this.imgIndex + 1)
            this.hadCached.push(this.imgIndex + 1)
          }
          window.$('.flip_book').turn('page', this.imgIndex + 1)
        })
      }
    },
    rotate () {
      if (!this.isReadingMode) {
        this.imgStyle.deg -= 90
      }
    },
    // 左转
    reverse () {
      if (!this.isReadingMode) {
        this.imgStyle.deg += 90
      }
    },
    // 右转
    zoomIn () {
      if (!this.isReadingMode) {
        this.imgStyle.scale += 0.3
      }
      // else {
      //   this.$nextTick(() => {
      //     window.$('.img-box').zoom('zoomIn')
      //   })
      // }
    },
    zoomOut () {
      if (!this.isReadingMode) {
        if (this.imgStyle.scale <= 0.3) {
          return
        }
        this.imgStyle.scale -= 0.3
      }
      // else {
      //   if (this.zoom <= 0.3) {
      //     return
      //   }
      //   this.$nextTick(() => {
      //     window.$('.img-box').zoom('zoomOut')
      //   })
      // }
    },
    // 阅读模式
    readingMode () {
      this.isReadingMode = true
      if (this.images.length > 0) {
        window.$('.flip_book').turn('page', this.imgIndex + 1)
      }
    },
    // 取消阅读模式
    cancelReadingMode () {
      this.isReadingMode = false
    },
    setSuitableSize () {
      if (!this.isReadingMode) {
        this.isSuitableSize = true
        this.resetData()
      }
    },
    suitableSize () {
      const imgWidth = this.$refs.img.naturalWidth
      const imgHeight = this.$refs.img.naturalHeight
      const imgRatio = imgHeight / imgWidth
      const boxRect = this.$refs.imgShowBox.getBoundingClientRect()
      const boxWidth = boxRect.width
      const boxHeight = boxRect.height
      const boxRatio = boxHeight / boxWidth
      if (imgRatio > boxRatio) {
        this.imgStyle.height = boxHeight - 40 + 'px'
      } else {
        this.imgStyle.width = boxWidth - 40 + 'px'
      }
      // this.imgStyle.scale = 1
    },
    setActualSize () {
      if (!this.isReadingMode) {
        this.isSuitableSize = false
        this.resetData()
      }
    },
    resetData () {
      this.imgStyle = {
        scale: 1,
        deg: 0,
        top: 0,
        left: 0
      }
      if (this.isSuitableSize) {
        this.suitableSize()
      }
    },
    // 鼠标事件
    handleMouseDown (e) {
      // 记录鼠标点击时的初始坐标
      this.mousePoint = {
        x: e.clientX,
        y: e.clientY
      }
      document.onmousemove = this.handleMouseMove
      document.onmouseup = this.handleMouseUp
    },
    handleMouseMove (e) {
      const imgShowBox = this.$refs.imgShowBox.getBoundingClientRect()
      const img = this.$refs.img.getBoundingClientRect()
      //  rectObject = object.getBoundingClientRect();
      //  rectObject.top：元素上边到视窗上边的距离;
      //  rectObject.bottom：元素下边到视窗上边的距离;
      //  rectObject.left：元素左边到视窗左边的距离;
      //  rectObject.right：元素右边到视窗左边的距离;
      // 鼠标偏移量 = 初始坐标 - 当前坐标
      const dx = e.clientX - this.mousePoint.x
      const dy = e.clientY - this.mousePoint.y
      // 余留四角60px*60PX不可拖拽
      // 设置左右拖拽范围
      if (
        (dx < 0 && imgShowBox.left + 60 < img.right) ||
          (dx > 0 && img.left + 60 <= imgShowBox.right)
      ) {
        // 设置每次左右拖拽最大距离
        const newDx =
            dx > 0
              ? Math.min(dx, imgShowBox.right - img.left - 60)
              : Math.max(dx, -(img.right - imgShowBox.left - 60))
        this.imgStyle.left += newDx
      }
      // 设置上下拖拽范围
      if (
        (dy < 0 && imgShowBox.top + 60 < img.bottom) ||
          (dy > 0 && img.top + 60 <= imgShowBox.bottom)
      ) {
        // 设置每次上下拖拽最大距离
        const newDy =
            dy > 0
              ? Math.min(dy, imgShowBox.bottom - img.top - 60)
              : Math.max(dy, -(img.bottom - imgShowBox.top - 60))
        this.imgStyle.top += newDy
      }
      // this.imgStyle.left += e.clientX - this.mousePoint.x
      // this.imgStyle.top += e.clientY - this.mousePoint.y
      this.mousePoint = {
        x: e.clientX,
        y: e.clientY
      }
    },
    handleMouseUp (e) {
      document.onmousemove = null
      document.onmouseup = null
    },
    handleMouseWheel (e) {
      // const wheelDeltaY = e.wheelDeltaY
      if (e.wheelDeltaY > 0) {
        this.imgStyle.scale += 0.1
      } else if (e.wheelDeltaY < 0) {
        if (this.imgStyle.scale <= 0.2) {
          return
        }
        this.imgStyle.scale -= 0.1
      }
    },
    // 打印
    print () {
      const iframe = document.createElement('IFRAME')
      let doc = null
      iframe.setAttribute(
        'style',
        'position:absolute;width:0px;height:0px;left:-500px;top:-500px;'
      )
      document.body.appendChild(iframe)
      doc = iframe.contentWindow.document

      doc.write(`<div style="text-align:center">
      <img src=${this.imgUrl}  id="img"/>
      </div>
      `)
      doc.close()
      const img = doc.getElementById('img')
      img.onload = function () {
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
        document.body.removeChild(iframe)
      }
    },
    // 下载
    download () {
      const elink = document.createElement('a')
      elink.download = this.images[this.imgIndex].name
      elink.style.display = 'none'
      elink.href = this.imgUrl
      elink.target = '_blank'
      document.body.appendChild(elink)
      elink.click()
      document.body.removeChild(elink)
    },
    // 点击菜单栏中的文件改变输入框的值和当前图片
    handleNodeClick (data) {
      if (this.images.length > 0) {
        this.imgIndex = data.number
        this.imgUrl = this.images[this.imgIndex].url
        this.$emit('handleMenuEvent', 'changeInputValue', data.number + 1)
        this.resetData()
        this.$nextTick(function () {
          if (!this.hadCached.includes(this.imgIndex + 1)) {
            const searchImg = document.createElement('img')
            searchImg.src = this.images[this.imgIndex].url
            searchImg.className = 'flip_book_img'
            const element = window.$('<div  class="flip_book_bg"/>').html(searchImg)
            window.$('.flip_book').turn('addPage', element, this.imgIndex + 1)
            this.hadCached.push(this.imgIndex + 1)
          }
          window.$('.flip_book').turn('page', this.imgIndex + 1)
        })
      }
    },
    // 传入val改变输入框的值和当前图片
    search (val) {
      if (this.images.length > 0) {
        if (val - 1 <= 0) {
          this.imgIndex = 0
        } else if (val - 1 >= this.images.length - 1) {
          this.imgIndex = this.images.length - 1
        } else if (isNaN(val)) {
          this.imgIndex = 0
        } else {
          this.imgIndex = val - 1
        }
        this.$emit(
          'handleMenuEvent',
          'setCurrentKey',
          this.images[this.imgIndex].id
        )
        this.$emit('handleMenuEvent', 'changeInputValue', this.imgIndex + 1)
        this.imgUrl = this.images[this.imgIndex].url
        this.resetData()
        this.$nextTick(function () {
          if (!this.hadCached.includes(this.imgIndex + 1)) {
            const searchImg = document.createElement('img')
            searchImg.src = this.images[this.imgIndex].url
            searchImg.className = 'flip_book_img'
            const element = window.$('<div  class="flip_book_bg"/>').html(searchImg)
            window.$('.flip_book').turn('addPage', element, this.imgIndex + 1)
            this.hadCached.push(this.imgIndex + 1)
          }
          window.$('.flip_book').turn('page', this.imgIndex + 1)
        })
      }
    }
  }
}

// 初始化turnjs
function initTurn (img, imgLength) {
  const imgWidth = img.naturalWidth
  const imgHeight = img.naturalHeight
  this.readingModeWidth = imgWidth
  this.readingModeHeight = imgHeight
  const imgRatio = imgHeight / imgWidth
  const boxRect = this.$refs.imgShowBox.getBoundingClientRect()
  const boxWidth = boxRect.width
  const boxHeight = boxRect.height
  const boxRatio = boxHeight / boxWidth
  let width, height
  if (imgRatio > boxRatio) {
    height = boxHeight - 40
    width = height / imgRatio
  } else {
    width = boxWidth - 40
    height = width * imgRatio
  }
  if (this.images.length > 0) {
    this.hadCached.push(1)
    window.$('.flip_book').turn({
      width: width,
      height: height,
      display: 'single',
      gradients: true,
      autoCenter: true,
      duration: 1800,
      pages: imgLength,
      elevation: 50,
      when: {
        start: event => {
          if (imgLength === 1) {
            event.preventDefault()
          }
        },
        turning: (event, page, pageObj) => {
          if (imgLength > 1 && page <= imgLength) {
            this.imgIndex = page - 1
            this.imgUrl = this.images[this.imgIndex].url
            this.$emit(
              'handleMenuEvent',
              'setCurrentKey',
              this.images[this.imgIndex].id
            )
            // 触发菜单选中
            this.$emit(
              'handleMenuEvent',
              'changeInputValue',
              this.imgIndex + 1
            )
            // 改变当前页码
          } else return false
        },
        turned: () => {
          if (imgLength > 1) {
            this.$nextTick()
              .then(() => {
                const nextPage = this.imgIndex + 2
                if (
                  !this.hadCached.includes(nextPage) &&
                    nextPage <= imgLength
                ) {
                  const nextImg = document.createElement('img')
                  nextImg.src = this.images[nextPage - 1].url
                  nextImg.className = 'flip_book_img'
                  const element = window
                    .$('<div  class="flip_book_bg"/>')
                    .html(nextImg)
                  window.$('.flip_book').turn('addPage', element, nextPage)
                  this.hadCached.push(nextPage)
                }
              })
              .then(() => {
                const prevPage = this.imgIndex
                if (!this.hadCached.includes(prevPage) && prevPage >= 1) {
                  const prevImg = document.createElement('img')
                  prevImg.src = this.images[prevPage - 1].url
                  prevImg.className = 'flip_book_img'
                  const element = window
                    .$('<div  class="flip_book_bg"/>')
                    .html(prevImg)
                  window.$('.flip_book').turn('addPage', element, prevPage)
                  this.hadCached.push(prevPage)
                }
              })
          }
        }
      }
    })
    // turnjs
    // window.$('.img-box').zoom({
    //   flipbook: window.$('.flip_book'),
    //   max: function () {
    //     return boxWidth / window.$('.flip_book').width()
    //   }
    // })
    // window.$(window).resize(function () {
    //   window.$('.img-box').zoom('resize')
    // })
    // zoomjs
  }
}
</script>
<style lang="scss" scoped>
    // 图片展示区
    .image_show_box {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        // 左右翻页按钮
    }

    // 拖拽
    .drag_container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.4s;

        img {
            cursor: grab;
        }

        img.default_size {
            max-width: 100%;
            max-height: 100%;
        }
    }

    .flip_book {
        .flip_book_bg {
            background-color: #fff;
        }

        .flip_book_img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }

        div[style*="pointer-events: none"] div[style*="cursor: default"] {
            background-color: #fff;
        }
    }

    .img-box {
        width: 100%;
        height: 100%;
        text-align: center;
        overflow: auto;
    }
</style>
