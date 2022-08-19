<script>
  import { onMount, onDestroy } from 'svelte';
	import { sessionStore, tokenStore } from '../session-store';
  import { goto } from '@sapper/app';

  let username = '';
  let pw = '';
  let isValid = false;
  let token = '';
  let unsubscribe;

  onMount(() => {
    unsubscribe = tokenStore.subscribe(x => {
      token = x;
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  $:isValid = username !== '' && pw !== '';

  async function onSubmit() {
    try {
      const res = await fetch('http://localhost:8000/auth/signin', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "benny",
          password: "bennY000"
        })
      });
      if (!res.ok) {
        throw new Error("An error occurred, please try again!");
      }
      const data = await res.json();
      tokenStore.setToken(data.accessToken);
      localStorage.setItem('access-token', data.accessToken);
      sessionStore.setIsLogin(true);
      await goto('/');
      
    } catch (error) {
      console.log(error);
    }
  }
</script>

<input required type="text" value={username} on:input={event => (username = event.target.value)} />
<input required type="password" value={pw} on:input={event => (pw = event.target.value)} />
<button type="button" on:click={onSubmit} disabled={!isValid}>Login</button>