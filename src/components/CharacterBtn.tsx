import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { ICharacter } from "../routes/Home";

const Wrapper = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #3f51b5;
    color: #fff;
  }
`;

const CircleImage = styled.img`
  width: 300px;
  height: 300px;
`;

function CharacterBtn({ id, name, imageUrl }: ICharacter) {
  return (
    <Wrapper>
      <CircleImage src={imageUrl} />
      {name}
    </Wrapper>
  );
}

export default CharacterBtn;
