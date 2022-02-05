export default {
  data() {
    return {
      text: 'test',
    }
  },
  props: ['pagination'],
  template: '#pagination',
  mounted() {},
  methods: {
    changePage(page) {
      this.$emit('change-page', page)
    },
  },
}
