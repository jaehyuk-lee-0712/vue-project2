<template>
  <div class="main__container">
    <HeaderSection />
    <div class="detail__inner">
      <div v-if="movie" class="detail__container">
        <div class="detail__header">
          <img :src="imgBaseURL + movie.poster_path" alt="movie poster" />
          <div class="detail__movie__title">
            <h1>{{ movie.title }}</h1>
            <p>{{ movie.overview }}</p>
            <div class="detail__movie__desc">
              <div class="movie__desc">
                <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
                <p><strong>Vote Average:</strong> {{ movie.vote_average }} / 10</p>
              </div>
              <button class="play-button" @click="openTrailer">
                <v-icon name="io-play-circle-sharp" scale="2" fill="white"></v-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="detail__movie__credits">
          <h2>Credits</h2>
          <div class="credits">
            <ul>
              <li v-for="credit in credits.slice(0, 20)" :key="credit.id">
                <div>
                  <img :src="creidtsProfileBaiscPath + credit.profile_path" alt="profile" />
                  <div class="credits__info">
                    <span class="cast__name">{{ credit.name }}</span>
                    <span class="char__name">{{ credit.character }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
    </div>
    <ModalComponent v-if="showModal" :video-key="trailerKey" @close="closeTrailer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import HeaderSection from '../components/HeaderSection.vue'
import ModalComponent from './ModalComponent.vue'

interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  vote_average: number
  poster_path: string
}

interface Credit {
  id: number
  name: string
  character: string
  profile_path: string
}

interface Video {
  key: string
  type: string
  site: string
}

export default defineComponent({
  components: {
    HeaderSection,
    ModalComponent
  },
  setup() {
    const route = useRoute()
    const movie = ref<Movie | null>(null)
    const credits = ref<Credit[]>([])
    const videos = ref<Video[]>([])
    const showModal = ref(false)
    const trailerKey = ref<string>('')
    const creidtsProfileBaiscPath = 'https://image.tmdb.org/t/p/w500'
    const apiKey = '3955814d3548fe10d481bb72113fe24e'
    const imgBaseURL = 'https://image.tmdb.org/t/p/w1280'

    const fetchMovieDetail = async () => {
      try {
        const movieId = route.params.movieID
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        )
        const responseCredits = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        )
        const responseVideos = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        )

        movie.value = response.data
        credits.value = responseCredits.data.cast
        videos.value = responseVideos.data.results

        // Extract trailer key
        const trailer = videos.value.find(
          (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
        )
        trailerKey.value = trailer ? trailer.key : ''
      } catch (error) {
        console.error('Failed to fetch movie details:', error)
      }
    }

    const openTrailer = () => {
      if (trailerKey.value) {
        showModal.value = true
      } else {
        alert('Trailer not available')
      }
    }

    const closeTrailer = () => {
      showModal.value = false
    }

    onMounted(fetchMovieDetail)

    return {
      movie,
      credits,
      videos,
      showModal,
      trailerKey,
      creidtsProfileBaiscPath,
      imgBaseURL,
      openTrailer,
      closeTrailer
    }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
.main__container {
  background-color: var(--new-main-color);
  overflow: hidden;
  height: 100vh;
  .detail__inner {
    position: relative;
    width: calc(100% - 296px);
    left: 334px;
    height: 100%;
    margin-top: 50px;
    overflow-y: auto;
    padding-bottom: 50px;

    .detail__container {
      padding: 0;
      .detail__header {
        display: flex;
        flex-direction: row;
        .detail__movie__title {
          position: relative;
          display: block;
          h1 {
            font-family: 'Audiowide', sans-serif;
            color: #fff;
            margin-left: 0.875rem;
          }
          p {
            width: 85%;
            font-family: 'Nunito', sans-serif;
            margin-left: 0.875rem;
          }

          .detail__movie__desc {
            position: absolute;
            left: 0;
            bottom: 18px;
            width: 100%;
            display: flex;
            .movie__desc {
              display: block;
              width: 14.25rem;
              flex-wrap: wrap;
              flex-direction: row;
            }
            button {
              background-color: #222c3a;
              border: none;
              cursor: pointer;
              color: #b2b2b5;
              padding: 0 12px;
              font-size: 16px;
              height: 48px;
              width: 6.25rem;
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
          }
        }
        img {
          width: 200px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
      }

      .detail__movie__credits {
        h2 {
          color: #fff;
          font-family: 'Audiowide', sans-serif;
        }
        .credits {
          width: 100%;
          overflow-x: auto;
          padding-bottom: 50px;
          ul {
            display: flex;
            flex-wrap: nowrap;
            li {
              padding-right: 20px;
              img {
                width: 150px;
                margin-bottom: 10px;
              }
              .credits__info {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                span {
                  width: 100%;
                  font-family: 'Nunito', sans-serif;
                  &.cast__name {
                    font-weight: bold;
                    color: #fff;
                    font-size: 1.25rem;
                    white-space: normal;
                    word-break: break-word;
                  }
                  &.char__name {
                    color: #bbb;
                  }
                }
              }
              margin-bottom: 20px;
            }
          }
        }
      }

      .loading {
        padding: 20px;
        text-align: center;
        color: var(--new-main-color);
      }
      p {
        color: #fff;
        font-family: 'Nunito', sans-serif;
      }
    }
  }

  /* Media Queries */
  @media (max-width: 1024px) {
    .detail__inner {
      width: 100%;
      left: 0;
      padding: 0 1rem;
      .detail__container {
        .detail__header {
          flex-direction: column;
          align-items: center;
          img {
            width: 100%;
            max-width: 300px;
            margin-bottom: 1rem;
          }
          .detail__movie__title {
            text-align: center;
            h1,
            p {
              margin-left: 0;
            }
          }
        }
        .detail__movie__credits {
          .credits {
            ul {
              justify-content: center;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .detail__inner {
      margin-top: 20px;
      .detail__container {
        .detail__header {
          img {
            width: 80%;
            max-width: 200px;
          }
          .detail__movie__title {
            h1 {
              font-size: 1.5rem;
            }
            p {
              font-size: 0.875rem;
              width: 90%;
              margin: 0 auto;
            }
          }
        }
        .detail__movie__credits {
          .credits {
            ul {
              flex-direction: column;
              li {
                margin-bottom: 1rem;
                img {
                  width: 100px;
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
