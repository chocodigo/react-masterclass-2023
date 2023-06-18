import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovie, IMovieDetail, makeBgPath } from "../api";
import { motion } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { movieId } from "../atoms";

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  position: absolute;
  background-size: cover;
  background-color: black;
  color: white;
  border-radius: 40px;
  width: 50vw;

  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  img {
    width: 50vw;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
  }
`;

const Contents = styled(motion.div)`
  height: 50vh;
  overflow: auto;
  padding: 12px;
  box-sizing: border-box;
  h1 {
    font-weight: bold;
    font-size: large;
  }
  h2 {
    margin-top: 4px;
    margin-bottom: 4px;
  }
`;

interface IProps {
  id: number;
  layoutId: string;
}

const Modal = ({ id, layoutId }: IProps) => {
  const { isLoading, data: movie } = useQuery<IMovieDetail>("movieDetail", () =>
    getMovie(id)
  );

  const setId = useSetRecoilState(movieId);

  return (
    <>
      {!isLoading && movie && (
        <Overlay
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          onClick={() => setId(-1)}
        >
          <Box key={id} layoutId={layoutId}>
            <img src={makeBgPath(movie.backdrop_path)} />
            <Contents>
              <h1>{movie.title}</h1>
              <h2>
                {movie.genres.map((genre) => (
                  <span
                    key={`${movie.title}_${genre.name}`}
                    style={{ marginRight: "8px" }}
                  >
                    {genre.name}
                  </span>
                ))}
              </h2>
              <div>{movie.overview}</div>
              <div>Budget: {movie.budget}</div>
              <div>Revenue: {movie.revenue}</div>
              <div>Runtime: {movie.runtime}</div>
              <div>Rating: {movie.vote_average}</div>
              <div>Homepage: {movie.homepage}</div>
              <div>
                Production Companies:{" "}
                {movie.production_companies.map((company) => (
                  <div key={`${movie.title}_${company.name}`}>
                    {company.name}
                  </div>
                ))}
              </div>
              <div>
                Production Countries:{" "}
                {movie.production_countries.map((country) => (
                  <div key={`${movie.title}_${country.name}`}>
                    {country.name}
                  </div>
                ))}
              </div>
              <div>
                Languages:{" "}
                {movie.spoken_languages.map((lang) => (
                  <div key={`${movie.title}_${lang.name}`}>{lang.name}</div>
                ))}
              </div>
              <div>Status : {movie.status}</div>
              <div>Tag : {movie.tagline}</div>
            </Contents>
          </Box>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
