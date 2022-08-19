<script>
  import Tasks from '../components/Tasks.svelte';
  import { sessionStore, tokenStore } from '../session-store';
  import { goto } from '@sapper/app';

  let isLogin = $sessionStore;
</script>

<style>
	
</style>
  
<svelte:head>
	<title>My Tasks</title>
</svelte:head>

{#if isLogin}
<Tasks />
{/if}
