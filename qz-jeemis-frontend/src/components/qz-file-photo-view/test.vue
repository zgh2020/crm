// 测试页面

<template>
  <photo :data="data" />
</template>

<script>
import photo from './index'
export default {
  data () {
    return {
      data: {
        id: '7',
        title: 'test',
        fileName: '',
        children: [{
          id: '1',
          fileId: '',
          title: 'test2.',
          fileName: '',
          fileType: 'gif',
          children: [
            {
              id: '5',
              fileId: '',
              title: 'test3.jpg',
              fileName: 'test3.jpg',
              fileType: 'gif', // 可能会用来显示图标 gif  jpg  png 图标不一样
              url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574845497212&di=dbc57211a5d2fc0023892bd288cf4d3e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1161153694%2C539857821%26fm%3D214%26gp%3D0.jpg' // 这一个有可能传不过来 暂时用着, 可能需要用 fileId生成
            },
            {
              id: '2',
              fileId: '',
              title: 'test3.jpg',
              fileName: 'test2.jpg',
              fileType: 'gif', // 可能会用来显示图标 gif  jpg  png 图标不一样
              url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1517469698,3700762158&fm=26&gp=0.jpg' // 这一个有可能传不过来 暂时用着, 可能需要用 fileId生成
            }

          ]
        },
        {
          id: 4,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575001610854&di=2f50d350e535b839989f8c34edc30341&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4d2b363949ea7528fd780e55a86b7a2ccc6b509955ca-sGDuYq_fw658',
          title: 'test2',
          fileName: 'test1.jpg',
          fileType: 'gif'
        },
        {
          id: 10,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575001610854&di=2f50d350e535b839989f8c34edc30341&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4d2b363949ea7528fd780e55a86b7a2ccc6b509955ca-sGDuYq_fw658',
          title: 'test2',
          fileName: 'test1.jpg',
          fileType: 'gif'
        },
        {
          id: 11,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575001610854&di=2f50d350e535b839989f8c34edc30341&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4d2b363949ea7528fd780e55a86b7a2ccc6b509955ca-sGDuYq_fw658',
          title: 'test2',
          fileName: 'test1.jpg',
          fileType: 'gif'
        },
        {
          id: 12,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575001610854&di=2f50d350e535b839989f8c34edc30341&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4d2b363949ea7528fd780e55a86b7a2ccc6b509955ca-sGDuYq_fw658',
          title: 'test2',
          fileName: 'test1.jpg',
          fileType: 'gif'
        },
        {
          id: 13,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575001610854&di=2f50d350e535b839989f8c34edc30341&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4d2b363949ea7528fd780e55a86b7a2ccc6b509955ca-sGDuYq_fw658',
          title: 'test2',
          fileName: 'test1.jpg',
          fileType: 'gif'
        },
        {
          id: 14,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575001610854&di=2f50d350e535b839989f8c34edc30341&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4d2b363949ea7528fd780e55a86b7a2ccc6b509955ca-sGDuYq_fw658',
          title: 'test2',
          fileName: 'test1.jpg',
          fileType: 'gif'
        },
        {
          id: 15,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575001610854&di=2f50d350e535b839989f8c34edc30341&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4d2b363949ea7528fd780e55a86b7a2ccc6b509955ca-sGDuYq_fw658',
          title: 'test2',
          fileName: 'test1.jpg',
          fileType: 'gif'
        },
        {
          id: '3',
          fileId: '',
          title: 'test4.jpg',
          fileName: 'test4.jpg',
          fileType: 'jpg', // 可能会用来显示图标 gif  jpg  png 图标不一样
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574847088596&di=139e4c582ea36966ab5f4990ef6f8a20&imgtype=0&src=http%3A%2F%2Fi9.download.fd.pchome.net%2Ft_2880x1800%2Fg1%2FM00%2F09%2F12%2FooYBAFO6RIWIQsN1ACrDyPxJF70AABtmgBnW3EAKsPg092.jpg'
        }
        ]
      }
    }
  },
  components: {
    photo
  }
}
</script>
