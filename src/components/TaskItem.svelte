<script>
  export let title;
  export let description;
  export let status;
</script>

<style>
  .ct {
    border-radius: 5px;
    padding-right: 5px;
    border: 1px solid blue;
  }
</style>

<div class="ct">
  <div>{title}</div>
  <div>{description}</div>
  <div>{status}</div>
</div>