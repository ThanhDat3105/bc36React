import React from "react";
import CarouselMovies from "./components/carousel/CarouselMovies";
import MovieList from "./components/movie-list/MovieList";
import News from "./components/news/News";

export default function HomePage() {
  return (
    <div className="py-5">
      <CarouselMovies />
      <MovieList />
      <News />
    </div>
  );
}
