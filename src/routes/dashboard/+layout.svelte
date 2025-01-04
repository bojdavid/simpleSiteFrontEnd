<script>
  import "./dashboard.css";
  let { children } = $props();
</script>

<div class="layout">
  <div class="sidebar">
    <h2>Sidebar</h2>
    <ul>
      <li><a href="/dashboard">Home</a></li>
      <li><a href="/dashboard/bio">About</a></li>
      <li><a href="/dashboard/services">Services</a></li>
      <li><a href="/dashboard/review">Review</a></li>
      <li>
        <form action="/api/logout" method="POST">
          <button type="submit" class="logout-button">Log Out</button>
        </form>
      </li>
    </ul>
  </div>

  <main class="content">
    {@render children()}
  </main>
</div>

<style>
  .logout-button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: 0;
    text-decoration: underline;
  }
</style>
