<script>
  let { rating } = $props();
  let stars = $derived('★'.repeat(rating) + '☆'.repeat(5 - rating));
</script>

<div class="star-rating">
  {stars}
</div>

<style>
  .star-rating {
    color: #ffd700;
    font-size: 1.2em;
  }
</style> 