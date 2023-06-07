import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import CharacterBtn from "../components/CharacterBtn";
import { fetchCharacters } from "../api";

const Wrapper = styled.div`
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const CharacterListWrapper = styled.div``;

export interface ICharacter {
  id: number;
  name: string;
  imageUrl: string;
}

function Home() {
  const { isLoading, data: characters } = useQuery<ICharacter[]>(
    "characterList",
    fetchCharacters
  );
  return (
    <Wrapper>
      Disney Characters
      <CharacterListWrapper>
        {!isLoading &&
          characters?.map((item) => (
            <CharacterBtn
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
            />
          ))}
      </CharacterListWrapper>
    </Wrapper>
  );
}

export default Home;
