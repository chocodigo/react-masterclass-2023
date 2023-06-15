import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import {getNowPlaying, IAPIResponse, makeImagePath} from "../api";

const Wrapper = styled.div`
  display: grid;
`
const NowPlaying = () =>{
    const { isLoading, data:movies } = useQuery<IAPIResponse>("nowPlayingMovies", getNowPlaying);
    return(!isLoading?<Wrapper>
        {
            movies?.results?.map((movie,index)=> <div key={`nowPlaying_${movie}_${index}`}>
                <img src={makeImagePath(movie?.poster_path)}/>
                <p>{movie.title}</p>
            </div>)
        }
    </Wrapper>:<>Loading...</>)
}

export default NowPlaying;
