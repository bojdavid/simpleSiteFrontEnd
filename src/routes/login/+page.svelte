<script>
    import { enhance } from '$app/forms';
    import "../../styles/app.css"
    
    export let form;
    let isSubmitting = false;

    function handleSubmit() {
        isSubmitting = true;
        
        return async ({ update }) => {
            await update();
            isSubmitting = false;
        };
    }
</script>
<div class="login-box">
  <div class="bg-primary-500 p-5 mx-3 shadow-lg rounded-md">
      <p>Login</p>
      
      <form method="POST" use:enhance={handleSubmit}>
          <div class="user-box">
              <input required name="email" id="email" type="text" value="email@email.com">
              <label for="email">Email</label>
          </div>
          <div class="user-box">
              <input required name="password" id="password" type="password" value="checking">
              <label for="password">Password</label>
          </div>
          
          <button type="submit" disabled={isSubmitting}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {isSubmitting ? 'Logging in...' : 'Submit'}
          </button>
      </form>
  
      {#if form?.message}
          <p class="error-message" style="color: red; text-align: center; margin-top: 1rem;">
              {form.message}
          </p>
      {/if}
  
      <p class="text-surface-500 text-[14px]">Forgot Password? <a href="/reset-password" class="text-tertiary-100 hover:text-tertiary-300 hover:underline">click here to reset</a></p>
  </div>
</div>

<style>
/* From Uiverse.io by glisovic01 */ 
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 500px;
  width: 100%;
  min-width: 270px;
  
  margin: 20px auto;
  transform: translate(-50%, -55%);

}

.login-box p:first-child {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.login-box form button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 3px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.login-box button:hover {
  background: #fff;
  color: #272727;
  border-radius: 5px;
}

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fff);
  animation: btn-anim1 1.5s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,100% {
    left: 100%;
  }
}

.login-box button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #fff);
  animation: btn-anim2 1.5s linear infinite;
  animation-delay: .375s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }

  50%,100% {
    top: 100%;
  }
}

.login-box button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #fff);
  animation: btn-anim3 1.5s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,100% {
    right: 100%;
  }
}

.login-box button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #fff);
  animation: btn-anim4 1.5s linear infinite;
  animation-delay: 1.125s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,100% {
    bottom: 100%;
  }
}


/* Add this new style for the error message */
.error-message {
    font-size: 0.9rem;
    padding: 0.5rem;
    background-color: rgba(255, 0, 0, 0.1);
    border-radius: 4px;
}

/* Add disabled button styles */
.login-box button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>