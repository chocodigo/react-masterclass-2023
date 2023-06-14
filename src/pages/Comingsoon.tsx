import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import {getComingSoon, IAPIResponse, makeImagePath} from "../api";

const Wrapper = styled.div`
  display: grid;
`
const Comingsoon = () =>{
    const { isLoading, data:movies } = useQuery<IAPIResponse>("comingSoonMovies", getComingSoon);
    return(!isLoading?<Wrapper>
        {
            movies?.results?.map((movie,index)=> <div key={`comingsoon_${movie}_${index}`}>
                <img src={makeImagePath(movie?.poster_path)}/>
                <p>{movie.title}</p>
            </div>)
        }
    </Wrapper>:<>Loading...</>)
}

export default Comingsoon;