<template>
  <div class="main__container">
    <HeaderSection />
    <div class="main__inner">
      <div class="main__header">
        <div class="search-bar">
          <span class="icon">
            <v-icon name="pr-search" scale="1" fill="white" style="margin-bottom: 2px"></v-icon>
          </span>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for movies"
            aria-label="Search for movies"
            @input="searchMovies"
          />
          <button class="search-button" @click="searchMovies">
            <v-icon name="io-play-circle-sharp" scale="1" fill="white"></v-icon>
          </button>

          <div v-if="searchResults.length > 0" class="search-results">
            <ul class="search-results__list">
              <li v-for="movie in searchResults" :key="movie.id" class="search-results__item">
                <router-link :to="`/detail/${movie.id}`">
                  <!-- <img
                    :src="imgBaseURL + movie.poster_path"
                    alt="movie poster"
                    class="search-results__img"
                  /> -->
                  <div class="search-results__text">
                    <span class="search-results__title">{{ movie.title }}</span>
                    <span class="search-results__date">{{ movie.release_date }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="main__slider">
        <swiper
          class="mySwiper"
          effect="coverflow"
          :slides-per-view="3"
          :centered-slides="true"
          :space-between="50"
          :coverflow-effect="{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false
          }"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="movie in lastMovies" :key="movie.id">
            <div class="slide-content">
              <router-link :to="`/detail/${movie.id}`">
                <div class="image-container">
                  <img :src="imgBaseURL + movie.poster_path" alt="movie poster" />
                  <div class="movie-title">{{ movie.title }}</div>
                </div>
              </router-link>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="main__conts">
        <h2>Upcoming Movies</h2>
        <div class="conts__movies">
          <ul class="movies">
            <li
              class="movie__basic__info"
              v-for="cont in upcomingMovies.slice(0, 4)"
              :key="cont.id"
            >
              <router-link :to="`/detail/${cont.id}`">
                <div class="conts__movie__img">
                  <img
                    :src="imgBaseURL + cont.poster_path"
                    alt="conts_movie_img"
                    class="cont__img"
                  />
                  <div class="conts__movie__text">
                    <span class="conts__movie__title">{{ cont.title }}</span>
                    <span class="conts__movie__date">
                      {{ cont.release_date }}
                    </span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="main__conts">
        <h2>Top Rated Movies</h2>
        <div class="conts__movies">
          <ul class="movies">
            <li class="movie__basic__info" v-for="cont in topMovies.slice(0, 4)" :key="cont.id">
              <router-link :to="`/detail/${cont.id}`">
                <div class="conts__movie__img">
                  <img
                    :src="imgBaseURL + cont.poster_path"
                    alt="conts_movie_img"
                    class="cont__img"
                  />
                  <div class="conts__movie__text">
                    <span class="conts__movie__title">{{ cont.title }}</span>
                    <span class="conts__movie__date">
                      {{ cont.release_date }}
                    </span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="main__conts">
        <h2>Now Playing Movies</h2>
        <div class="conts__movies">
          <ul class="movies">
            <li class="movie__basic__info" v-for="cont in lastMovies.slice(0, 4)" :key="cont.id">
              <router-link :to="`/detail/${cont.id}`">
                <div class="conts__movie__img">
                  <img
                    :src="imgBaseURL + cont.poster_path"
                    alt="conts_movie_img"
                    class="cont__img"
                  />
                  <div class="conts__movie__text">
                    <span class="conts__movie__title">{{ cont.title }}</span>
                    <span class="conts__movie__date">
                      {{ cont.release_date }}
                    </span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import SwiperCore, { Pagination, EffectCoverflow } from 'swiper'

SwiperCore.use([Pagination, EffectCoverflow])

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import HeaderSection from '../components/HeaderSection.vue'

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  vote_average: number
  poster_path: string
}

export default defineComponent({
  components: {
    HeaderSection,
    Swiper,
    SwiperSlide
  },
  setup() {
    const lastMovies = ref<Movie[]>([])
    const topMovies = ref<Movie[]>([])
    const upcomingMovies = ref<Movie[]>([])
    const searchQuery = ref<string>('')
    const searchResults = ref<Movie[]>([])
    const apiKey = '3955814d3548fe10d481bb72113fe24e'
    const imgBaseURL = 'https://image.tmdb.org/t/p/w1280'

    const fetchMovies = async () => {
      try {
        const latestResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`
        )

        const topResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`
        )

        const upcomingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=1`
        )
        lastMovies.value = latestResponse.data.results
        topMovies.value = topResponse.data.results
        upcomingMovies.value = upcomingResponse.data.results
        console.log(lastMovies.value)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      }
    }

    const searchMovies = async () => {
      if (searchQuery.value.trim() === '') {
        searchResults.value = []
        return
      }

      try {
        const searchResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery.value)}`
        )
        searchResults.value = searchResponse.data.results
      } catch (error) {
        console.error('Failed to search movies:', error)
      }
    }

    onMounted(fetchMovies)

    return {
      lastMovies,
      topMovies,
      upcomingMovies,
      searchQuery,
      searchResults,
      imgBaseURL,
      searchMovies
    }
  }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
.main__container {
  background-color: var(--new-main-color);
  overflow: hidden;
  .main__inner {
    position: relative;
    width: calc(100% - 296px);
    left: 334px;
    height: 100%;
    margin-top: 50px;
    overflow-y: auto;
    .main__header {
      .search-bar {
        position: relative;
        display: flex;
        align-items: center;
        background-color: #19202b;
        border-radius: 16px;
        padding: 10px;
        width: 300px;

        input[type='text'] {
          flex-grow: 1;
          background-color: transparent;
          border: none;
          color: white;
          padding: 8px 12px;
          font-size: 16px;
          outline: none;
          font-family: 'Nunito', sans-serif;
          &:focus {
            outline: none;
          }
        }

        button {
          background-color: #222c3a;
          border: none;
          cursor: pointer;
          color: #b2b2b5;
          padding: 0 12px;
          font-size: 16px;
          height: 30px;
          width: 50px;
          border-radius: 10px;
          .icon {
            display: block;
            svg {
              margin-bottom: 2px;
            }
          }

          &:focus {
            outline: none;
          }
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: #222c3a;
          border-radius: 8px;
          margin-top: 10px;
          padding: 10px;
          z-index: 1000;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

          .search-results__list {
            list-style: none;
            padding: 0;
            margin: 0;
            min-height: 300px;
            max-height: 300px;
            overflow-y: auto;
            .search-results__item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              cursor: pointer;
              &:hover {
                background-color: #3a3f47;
                border-radius: 4px;
              }
              .search-results__img {
                width: 50px;
                height: 75px;
                margin-right: 10px;
                border-radius: 4px;
              }
              .search-results__text {
                display: flex;
                flex-direction: column;
                .search-results__title {
                  color: white;
                  font-family: 'Nunito', sans-serif;
                }
                .search-results__date {
                  color: #b2b2b5;
                  font-family: 'Nunito', sans-serif;
                }
              }
            }
          }
        }
      }
    }

    .main__slider {
      width: 100%;
      height: 50vh;
      .mySwiper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          background-size: cover;
          background-position: center;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .slide-content {
            position: relative;
            width: 100%;
            max-width: 300px; /* 슬라이드의 최대 너비를 설정 */
            .image-container {
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
              box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); /* 그림자 효과 */
              img {
                width: 100%;
                height: auto; /* 이미지의 왜곡 없이 전체 표시 */
              }
              .movie-title {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 24px;
                font-family: 'Audiowide', sans-serif;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* 그림자 효과 */
                width: 90%; /* 제목이 이미지 경계에 걸리지 않도록 조정 */
                text-align: center; /* 텍스트 중앙 정렬 */
              }
            }
          }
        }
      }
    }
    .main__conts {
      margin-top: 20px;
      width: 100%;
      height: 40vh;
      padding-bottom: 500px;
      h2 {
        color: #fff;
        font-family: 'Nunito', sans-serif;
      }
      .conts__movies {
        width: 100%;
        height: calc(40vh - 36px);
        .movies {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          .movie__basic__info {
            display: flex;
            width: 25%;
            height: 100%;
            margin-right: 10px;
            .conts__movie__img {
              width: 70%;

              .cont__img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
              .conts__movie__text {
                width: 100%;
                height: 40%;
                display: flex;
                align-items: start;
                flex-direction: row;
                flex-wrap: wrap;
                padding-bottom: 100px;
                .conts__movie__title {
                  width: 100%;
                  color: #fff;
                  font-family: 'Nunito', sans-serif;
                }
                .conts__movie__date {
                  width: 100%;
                  color: #fff;
                  font-family: 'Nunito', sans-serif;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
