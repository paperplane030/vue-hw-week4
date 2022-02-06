import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js'
import pagination from './component/pagination/pagination.js'
import productModal from './component/productModal/productModal.js'
import delModal from './component/delModal/delModal.js'
const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'paperplane-hexschool',
      products: [],
      product_temp: {
        edit: false,
        data: {
          title: '',
          category: '',
          origin_price: 0,
          price: 0,
          unit: '',
          description: '',
          content: '',
          is_enabled: 0,
          imageUrl: '',
          imagesUrl: [],
        },
      },
      isReady: false,
      productModal: {},
      delProductModal: {},
      toast: {
        instance: {},
        text: '',
      },
      pagination: {},
    }
  },
  components: {
    pagination,
    productModal,
    delModal,
  },
  mounted() {
    this.checkLogin()
    // 定義 toast
    this.toast = new bootstrap.Toast(document.querySelector('#toast'))
    // 定義 modal
    this.productModal = new bootstrap.Modal(
      document.querySelector('#productModal')
    )
    this.delProductModal = new bootstrap.Modal(
      document.querySelector('#delProductModal')
    )
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      axios.defaults.headers.common['Authorization'] = token
      axios
        .post(`${this.url}/api/user/check`)
        // 成功
        .then((res) => {
          this.getData()
        })
        // 失敗
        .catch((error) => {
          // console.dir(error)
          this.toast.text = '登入資訊驗證錯誤，將回到登入頁面...'
          this.toast.show()
          setTimeout(() => {
            window.location = 'login.html'
          }, 3000)
        })
    },
    getData(page = 1) {
      axios
        .get(`${this.url}/api/${this.path}/admin/products/?page=${page}`)
        // 成功
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isReady = true
        })
        // 失敗
        .catch((error) => {
          // console.dir(error)
        })
    },
    addProductModal() {
      this.product_temp.edit = false
      this.productModal.show()
    },
    closeModal() {
      this.product_temp.edit = false
      this.productModal.hide()
    },
    closeDelModal() {
      this.delProductModal.hide()
    },
    editProductModal(item) {
      this.product_temp.edit = true
      this.product_temp.data = JSON.parse(JSON.stringify(item))
      this.productModal.show()
    },
    openDelProductModal(item) {
      this.delProductModal.show()
      this.product_temp.data = JSON.parse(JSON.stringify(item))
    },
    productStatus(status, item) {
      const temp = JSON.parse(JSON.stringify(item))
      temp.is_enabled = status
      axios
        .put(`${this.url}/api/${this.path}/admin/product/${temp.id}`, {
          data: temp,
        })
        // 成功
        .then((res) => {
          this.getData()
        })
        // 失敗
        .catch((error) => {
          alert('編輯商品失敗，請重新操作')
        })
    },
    toastOpen() {
      this.toast.text = '登入資訊驗證錯誤，將回到登入頁面...'
      this.toast.show()
    },
    changePage(page) {
      console.log('內傳外觸發', page)
      this.getData(page)
    },
  },
})
app.mount('#app')
