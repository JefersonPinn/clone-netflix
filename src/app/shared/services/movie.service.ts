import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const options = {
  params: {
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWYwYTRmYjE5M2EzZTE2M2UxNzJhMDEzMzQ4ZTYyMSIsIm5iZiI6MTY2MzE5ODc5MS41MzEwMDAxLCJzdWIiOiI2MzIyNjY0NzUzMmFjYjAwN2FiNWM3MDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Untk-4mAfoSKWLJijvQH3owb6rAJ3QznkW_qetq7MB8'
  }
};

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  http = inject(HttpClient)

  getMovies(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }
}
