<template>
    <div class="login-container">
      <div class="login-item glass-panel">
        <h1 class="login-welcome">Login</h1>
        <div class="login-inputs">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password">
            </div>
        </div>
        <div class="login-button">
            <div class="button">
                Login
            </div>
            <p>Don't have a account? <a href="/auth/register">Register!</a></p>
        </div>
      </div>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from "vue";
  
  defineComponent({
    name: "Login",
    setup() {
      return {}
    }
  })
</script>
  
<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  
  .login-item {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: var(--glass-bg);
    border-radius: 12px;
    width: 600px;
    flex-direction: column;
    gap: 10px;
  }
  
  .login-welcome {
    text-align: center;
    font-size: 30px;
  }
  
  .login-img {
    width: 80%;
    height: 230px;
  }
  
  .login-inputs {
    display: flex;
    padding: 10px 20px;
    border-radius: 12px;
    width: 70%;
    flex-direction: column;
    gap: 10px;
  }

  .login-button {
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 30px;
  }

  .login-button .button {
    width: 80% !important;
  }
</style>
  