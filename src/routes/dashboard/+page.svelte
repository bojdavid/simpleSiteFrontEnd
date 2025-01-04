<script>
  let userName = "User";
  let profilePicture = "";
  
  let stats = {
    reviews: { pending: 10, total: 33 },
    services: { pending: 10, total: 33 },
    projects: { pending: 10, total: 33 }
  };
</script>

<div class="dashboard">
  <header class="welcome-section">
    <h1>Welcome, {userName}</h1>
    
    <div class="profile-picture-container">
      <div class="profile-picture">
        <!-- <img src="" alt="Profile Picture" /> -->
        <span class="placeholder">Image</span>
      </div>
    </div>
  </header>

  <h2>Edit Your Sections</h2>

  <div class="stats-container">
    {#each Object.entries(stats) as [category, data]}
      <div class="stat-card">
        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        <div class="stat-numbers">
          <div class="stat-box">
            <span class="number">{data.pending}</span>
            <span class="label">Pending</span>
          </div>
          <div class="stat-box">
            <span class="number">{data.total}</span>
            <span class="label">Total</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .dashboard {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);
    min-height: 100vh;
  }

  .welcome-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    padding: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(120deg, #2563eb, #4f46e5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: #1f2937;
  }

  .profile-picture {
    width: 120px;
    height: 120px;
    border-radius: 1rem;
    overflow: hidden;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }

  .profile-picture:hover {
    transform: scale(1.05);
  }

  .placeholder {
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-5px);
  }

  .stat-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #374151;
  }

  .stat-numbers {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }

  .stat-box {
    text-align: center;
    background: #f8fafc;
    padding: 1.25rem;
    border-radius: 0.75rem;
    min-width: 100px;
    transition: background-color 0.2s;
  }

  .stat-box:hover {
    background: #f1f5f9;
  }

  .number {
    font-size: 2rem;
    font-weight: 700;
    display: block;
    color: #2563eb;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 500;
  }
</style>
