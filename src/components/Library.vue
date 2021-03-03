<template>
    <div id="library-header">
        <h1>My Library</h1>
        <div class="home">
        <div class="headlines">
          <div
            class="single__headline"
            v-for="(libraryItem, index) in importedLibrary"
            :key="index"
          >
            <div class="image__headline">
              <img :src="libraryItem.urlToImage" :alt="libraryItem.title" />
            </div>
            <h3>{{ libraryItem.title }}</h3>
            <p v-html="libraryItem.content"></p>
            <div class="bottom__headline">
              <small>Source: {{ libraryItem.source.name }}</small>
              <button id="bookmark">Delete from Library</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'Library',
        props: {
            importedLibrary: {
                type: Array,
                required: false
            }
        }
        
    }
</script>

<style scoped>
#library-header {
  text-align: center;
}

</style>