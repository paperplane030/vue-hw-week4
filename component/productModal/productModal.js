export default {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'paperplane-hexschool',
    }
  },
  props: ['product_temp'],
  template: '#productModal-template',
  mounted() {},
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    addProduct() {
      axios
        .post(`${this.url}/api/${this.path}/admin/product`, {
          data: this.product_temp.data,
        })
        // 成功
        .then((res) => {
          this.$emit('get-data')
          // this.productModal.hide()
          this.closeModal()
        })
        // 失敗
        .catch((error) => {
          alert(error.data.message)
          // this.productModal.hide()
        })
    },
    editProduct() {
      axios
        .put(
          `${this.url}/api/${this.path}/admin/product/${this.product_temp.data.id}`,
          {
            data: this.product_temp.data,
          }
        )
        // 成功
        .then((res) => {
          this.$emit('get-data')
          // this.productModal.hide()
          this.closeModal()
        })
        // 失敗
        .catch((error) => {
          alert(error.data.message)
          // this.productModal.hide()
        })
    },
    delImages(index) {
      this.product_temp.data.imagesUrl.splice(index, 1)
    },
  },
}
