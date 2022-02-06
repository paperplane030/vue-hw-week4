export default {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'paperplane-hexschool',
    }
  },
  props: ['product_temp'],
  template: '#delModal-template',
  mounted() {},
  methods: {
    closeModal() {
      this.$emit('closeDelModal')
    },
    delProduct() {
      axios
        .delete(
          `${this.url}/api/${this.path}/admin/product/${this.product_temp.data.id}`
        )
        // 成功
        .then((res) => {
          this.$emit('get-data')
          this.closeModal()
        })
        // 失敗
        .catch((error) => {
          alert('刪除商品失敗，請重新操作')
          this.closeModal()
        })
    },
  },
}
