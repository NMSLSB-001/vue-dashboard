<template>
  <div class="table_container">
    <el-form :model="newPasswordForm" :rules="rules" class="update_form">
      <!-- username -->
      <el-form-item>
        <span>Current Password</span>
        <el-input
          v-model="newPasswordForm.oldPassword"
          placeholder="Old Password"
        ></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item>
        <span>New Password</span>
        <el-input
          v-model="newPasswordForm.newPassword"
          type="password"
          placeholder="New Password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <span>Retype New Password</span>
        <el-input
          v-model="newPasswordForm.reNewPassword"
          type="password"
          placeholder="Retype New Password"
        ></el-input>
      </el-form-item>
      <!-- button -->
      <div class="buttons">
        <el-form-item>
          <el-button type="primary" @click="toUpdate()">Update</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter username'))
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter password'))
      }
    }
    return {
      newPasswordForm: {
        username: '',
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      rules: {
        newpassword: [{ validator: validatePassword, trigger: 'blur' }],
        reNewPassword: [{ validator: validateRePassword, trigger: 'blur' }]
      }
    }
  },
  created () {
    const currentIndex = '/settings'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
  },
  methods: {
    async toUpdate () {
      const updateForm = {
        userId: 5,
        username: 'test',
        userPassword: this.newPasswordForm.oldPassword,
        newPassword: this.newPasswordForm.newPassword
      }
      const { data: res } = await this.$api.post(
        'user/updatePassword',
        updateForm
      )
      console.log(res)
      if (res.code === 200) {
        alert('Update Successfully!')
        const currentLogin = null
        localStorage.setItem('activeLogin', JSON.stringify(currentLogin))
        this.$router.push('/login')
      } else {
        alert('Update Failed!')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
