<script>
  import { onMount } from 'svelte';
	import { tokenStore } from '../session-store';
  import TaskItem from './TaskItem.svelte';

  let token = $tokenStore;
  let tasks = [];

  onMount(async () => {
    token = localStorage.getItem('access-token');
    await load();
  });

  async function load() {
    try {
      const res = await fetch('http://localhost:8000/tasks', {
        headers: { 'Authorization': `Bearer ${token}`}
      });
      if (!res.ok) {
        throw new Error("An error occurred, please try again!");
      }
      const data = await res.json();
      tasks = data;
    } catch (error) {
      console.log(error);
    }
  }
</script>

{#each tasks as task (task.id)}
  <TaskItem title={task.title} description={task.description} status={task.status} />
{/each}