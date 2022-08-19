<script>
	import Nav from '../components/Nav.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore, tokenStore } from '../session-store';
  import { goto } from '@sapper/app';

	export let segment;

  let isLogin = false;
  let unsubscribe;

  onMount(async () => {
    unsubscribe = sessionStore.subscribe((x) => {
      isLogin = x;
    });
    const token = localStorage.getItem('access-token');
    if (token && token !== '') {
      tokenStore.setToken(token);
      sessionStore.setIsLogin(true);
      isLogin = true;
    }

    else {
      await goto('/login');
    }
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  })
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

{#if isLogin}
<Nav {segment}/>
{/if}

<main>
	<slot></slot>
</main>