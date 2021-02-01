//  pagetab title页签更改
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('d2admin/page', [
      'updatePageTitle',
      'updateCurrentPageTitle'
    ])
  }
}
