import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../contexts/loading/LoadingContext";
import { fetchMovieListApi } from "../services/movie";

export const useMovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    setLoadingState({ isLoading: true });

    const result = await fetchMovieListApi();

    setMovieList(result.data.content);
    setLoadingState({ isLoading: false });
  };

  return movieList;
};
