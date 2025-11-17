import React from "react";
import styled from "styled-components";
// Assets

export default function ServiceBox({ icon, title, subtitle }) {
  return (
    <Wrapper className="flex flexColumn">
      <IconStyle src={icon}></IconStyle>
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font13">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  direction: rtl;
  border-radius: 8px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;
const IconStyle = styled.img`
  width: 100%;
  height: 120px;
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
