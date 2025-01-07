<script>
  import "./dashboard.css";
  let { children } = $props();
  let isMenuOpen = $state(false);

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
</script>

<div class="layout">
  <!-- Mobile menu button -->
  <button class="menu-toggle" onclick={toggleMenu}>
    ☰
  </button>

  <div class="sidebar" class:open={isMenuOpen}>
    <h2>Sidebar</h2>
    <ul>
      <li><a href="/dashboard">Home</a></li>
      <li><a href="/dashboard/bio">About</a></li>
      <li><a href="/dashboard/services">Services</a></li>
      <li><a href="/dashboard/review">Review</a></li>
      <li>
        <form method="POST">
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
  .layout {
    position: relative;
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  .menu-toggle {
    display: none;
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
    z-index: 1000;
    background: #ffffff;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .menu-toggle:hover {
    transform: scale(1.05);
  }

  .sidebar {
    background: #ffffff;
    padding: 2rem;
    width: 280px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.06);
  }

  .sidebar h2 {
    color: #2d3748;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    margin-bottom: 0.75rem;
  }

  .sidebar a {
    color: #4a5568;
    text-decoration: none;
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .sidebar a:hover {
    background: #f7fafc;
    color: #2b6cb0;
    transform: translateX(4px);
  }

  .content {
    margin-left: 280px;
    padding: 2rem;
  }

  @media (max-width: 800px) {
    .menu-toggle {
      display: block;
    }

    .sidebar {
      position: fixed;
      left: -280px;
      top: 0;
      height: 100vh;
      width: 280px;
      background: white;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999;
    }

    .sidebar.open {
      transform: translateX(280px);
    }

    .content {
      margin-left: 0;
      padding: 4rem 1.5rem 1.5rem 1.5rem;
    }
  }

  .logout-button {
    width: 100%;
    background: #f7fafc;
    border: none;
    color: #e53e3e;
    cursor: pointer;
    font: inherit;
    padding: 0.75rem 1rem;
    text-align: left;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .logout-button:hover {
    background: #fed7d7;
    color: #c53030;
  }
</style>
