<template>
  <div>
    <div v-if="showLibrary">
      <Library :importedLibrary="library" />
    </div>
    <div v-else>
      <h1 id="header">Top Headlines in Great Britain Today</h1>
      <nav class="nav-bar">
        <ul class="nav-bar-item">
          <li
            v-for="(category, index) in categories"
            :key="index"
          >
            <router-link :to="`/?category=${category != 'all' ? category : ''}`">
              {{ category }}
            </router-link>
          </li>
          <button id="lib-button" @click="showLibrary = true">View Library</button>
        </ul>
      </nav>
      <br />
      <div class="home">
        <h2 id="loader" v-if="loading">Loading...</h2>
        <div class="headlines" v-else-if="allHeadlines.length">
          <div
            class="single__headline"
            v-for="(headline, hindex) in allHeadlines"
            :key="hindex"
          >
            <div class="image__headline">
              <img :src="headline.urlToImage" :alt="headline.title" />
            </div>
            <h3>{{ headline.title }}</h3>
            <p v-html="headline.content"></p>
            <h6><a :href="headline.url" target="_blank">Read full article</a></h6>
            <div class="bottom__headline">
              <small>Source: {{ headline.source.name }}</small>
              <button id="bookmark" @click="saveToLibrary(headline)">Save for Later</button>
            </div>
          </div>
        </div>
        <div class="headlines" v-else>
          <h4>No news in this category</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Library from '@/components/Library.vue'

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      allHeadlines: [],
      categories: [
        "all",
        "business",
        "entertainment",
        "health",
        "general",
        "science",
        "sports",
        "technology",
      ],
      showLibrary: false,
      library: []
    };
  },
  components: {
    Library
  },
  watch: {
    '$route': {
      deep: true,
      handler(value) {
        const { category } = value.query;
        this.fetchNewsByCategory(category);
      }
    }
  },
  mounted() {
    const { category } = this.$route.query;
    this.$axios
      .get(`/top-headlines?country=gb&category=${category != 'all' ? category : ''}`)
      .then(({ data }) => {
        const { articles } = data;
        this.allHeadlines = articles;
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        this.loading = false;
      });
    
    if (localStorage.getItem('libraryStorage')) {
      try {
        this.library = JSON.parse(localStorage.getItem('libraryStorage'))
        console.log(this.library)
      } catch(e) {
        localStorage.removeItem('libraryStorage')
      }
    }
  },
  methods: {
    fetchNewsByCategory(cat) {
      this.loading = true;
      this.$axios
        .get(
          `/top-headlines?country=gb&category=${
            cat !== "all" ? cat : ""
          }`
        )
        .then(({ data }) => {
          const { articles } = data;
          this.allHeadlines = articles;
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveToLibrary(headline) {
      this.library.push(headline)
      const parsed = JSON.stringify(this.library)
      localStorage.setItem('libraryStorage', parsed)
    },
  },
};
</script>

<style>
#header {
  text-align: center;
}
#loader {
  text-align: center;
  color: purple;
  font-style: italic;
}
.home {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: #ececec;
  min-height: 70vh;
  padding: 30px;
  box-sizing: border-box;
}
.headlines {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
.single__headline {
  border: 1px solid #333333;
  border-radius: 5px;
  padding: 16px;
  overflow: hidden;
  box-sizing: border-box;
}
.image__headline {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.bottom__headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}
/* img[src=""],
img:not([src]) {
  visibility: hidden;
} */ /*was trying to remove the broken image icon*/
#bookmark {
  border: none;
  border-radius: 5px;
  color: white;
  background: magenta;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
}
.nav-bar {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
}
.nav-bar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}
.nav-bar-item li {
  text-transform: uppercase;
  color: magenta;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
#lib-button {
  text-transform: uppercase;
  color: magenta;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
</style>
