<script>
  const { title = "Title", description = "A beautiful place at the shore of XYZ sea.", location = "California, USA" } = $props();
</script>

<figure class="card">
  <div class="remove-when-use">
    <div>Hover over me to show details</div>
  </div>
  <div class="details">
    <article>
      <div>{title}</div>
      <p>
        {description}
        <br />
        <i>{location}</i>
      </p>
    </article>
  </div>
</figure>

<style>
  /* From Uiverse.io by imPradhyumn */
  .card {
    width: 190px;
    height: 254px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    position: relative;
  }

  .remove-when-use {
    text-align: center;
    width: 100%;
    position: absolute;
    color: black;
    top: 85px;
    font-weight: bold;
  }

  article > p {
    font-size: 0.8em;
    margin-top: 0.5em;
  }

  article > div {
    font-weight: bold;
  }
  article {
    padding: 1em;
  }

  .details {
    color: white;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 190px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    height: 2.6em;
    transition: height 0.5s ease-in-out;
    overflow: hidden;
  }

  .card:hover > .details {
    height: 6.7em;
  }
</style>
