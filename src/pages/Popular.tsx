import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueries } from "react-query";
import {
  getComingSoon,
  getNowPlaying,
  getPopular,
  IAPIResponse,
  makeImagePath,
} from "../api";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { movieId } from "../atoms";
import { useLocation } from "react-router-dom";

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const MovieBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  img {
    border-radius: 40px;
    width: 300px;
  }
`;
const wrapperVariants = {
  start: {},
  end: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const movieVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const Popular = () => {
  const [id, setId] = useRecoilState(movieId);

  let { isLoading, data: movies } = useQuery<IAPIResponse>(
    "movies",
    getPopular
  );

  return !isLoading ? (
    <Wrapper variants={wrapperVariants} initial="start" animate="end">
      {movies?.results?.map((movie, index) => (
        <MovieBox
          key={movie.id}
          layoutId={movie.id + ""}
          onClick={() => {
            setId(movie.id);
          }}
          variants={movieVariants}
        >
          <img src={makeImagePath(movie?.poster_path)} />
          <p>{movie.title}</p>
        </MovieBox>
      ))}
    </Wrapper>
  ) : (
    <>Loading...</>
  );
};

export default Popular;
