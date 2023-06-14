import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import {getPopular, IAPIResponse, makeImagePath} from "../api";

const Wrapper = styled.div`
  display: grid;
`
const Popular = () =>{
    const { isLoading, data:movies } = useQuery<IAPIResponse>("popularMovies", getPopular);
    return !isLoading?<Wrapper>
        {
            movies?.results?.map((movie,index)=> <div key={`popular_${movie}_${index}`}>
                <img src={makeImagePath(movie?.poster_path)}/>
                <p>{movie.title}</p>
            </div>)
        }
    </Wrapper>:<>Loading...</>
}

export default Popular