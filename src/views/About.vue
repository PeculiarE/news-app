<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    this.$axios
      .get('/top-headlines?country=us')
      .then((response) => console.log(response))
      .catch((error) => {
        alert(error.response.data.message);
      })
      .finally(() => {});
  }
};
</script>
