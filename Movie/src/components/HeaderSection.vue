<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const latestMovies = ref([])
const headerContsMovies = ref([])
const apiKey = '3955814d3548fe10d481bb72113fe24e'

const imgBaseURL = 'https://image.tmdb.org/t/p/w1280'

const fetchMovies = async () => {
  try {
    const latestResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`
    )
    latestMovies.value = latestResponse.data.results
    headerContsMovies.value = latestMovies.value.slice(0, 3)
    console.log('Movies fetched:', headerContsMovies.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchMovies)
</script>

<template>
  <header id="header" role="banner">
    <div class="header__inner">
      <div class="header__title">
        <div class="header__img__logo">
          <v-icon name="ri-movie-line" scale="3" fill="white"></v-icon>
        </div>
        <div class="header__text">
          <h1 class="main__logo__text"><span>PopVie</span></h1>
          <p class="sub__logo__text">Let's watch the Movie!</p>
        </div>
      </div>
      <div class="header__nav">
        <ul class="menu">
          <li>
            <a href="/">
              <v-icon name="ri-movie-line" scale="1" fill="white"></v-icon>
              Home
            </a>
          </li>
          <!-- <li>
            <a href="/"><v-icon name="ri-movie-line" scale="1" fill="white"></v-icon>Category</a>
          </li> -->
          <li>
            <a href="/"><v-icon name="ri-movie-line" scale="1" fill="white"></v-icon>My Favorite</a>
          </li>
        </ul>
      </div>
      <div class="header__conts">
        <h2 class="conts__logo">Fast View</h2>
        <ul>
          <li v-for="cont in headerContsMovies" :key="cont.id">
            <img :src="imgBaseURL + cont.poster_path" alt="movie_poster" />
            <div class="movie__title">
              <a href="#">{{ cont.title }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

#header {
  width: 296px;
  height: 92%;
  background: var(--born-main-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin: 18px;
  position: fixed;
  .header__inner {
    width: 100%;
    height: 96%;
    .header__title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;

      .header__img__logo {
        margin-right: 34px;
      }
      .header__text {
        .main__logo__text {
          font-family: 'Audiowide', sans-serif;
          font-weight: 400;
          font-style: normal;
          color: #fff;
          text-transform: uppercase;
          font-size: 1.25rem;
        }

        .sub__logo__text {
          color: #fff;
          font-size: 14px;
          font-family: 'Audiowide', sans-serif;
          font-weight: 400;
          font-style: normal;
        }
      }
    }
    .header__nav {
      .menu {
        li {
          display: flex;
          margin: 0.575rem;
          align-items: center;
          justify-content: flex-start;
          flex-direction: row;
          a {
            width: 100%;
            font-size: 1rem;
            display: inline-block;
            text-align: left;
            color: #eeeeee59;
            font-family: 'Nunito', sans-serif;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-right: 2rem;
            padding-left: 0.5rem;
            border-radius: 10px;
            line-height: 2.2;
            svg {
              margin-right: 10px;
            }

            &:hover {
              background-color: rgba(99, 92, 92, 0.2); // 빨간색 배경에 20% 투명도
              color: #fff;
            }
          }
        }
      }
    }
    .header__conts {
      display: flex;
      justify-content: start;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 14px;

      .conts__logo {
        color: #fff;
        font-family: 'Nunito', sans-serif;
        font-weight: bold;
        font-size: 1.25rem;
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          width: 100%;

          img {
            width: 50px;
            height: 80px;
          }
          .movie__title {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-direction: column;
            width: 100%;
            a {
              font-size: 0.875rem;
              color: #fff;
              padding: 0.5rem;
              font-weight: bold;
              font-family: 'Nunito', sans-serif;
            }
          }
        }
      }
    }
  }
}
</style>
