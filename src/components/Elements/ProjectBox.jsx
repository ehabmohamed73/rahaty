import React from "react";
import styled from "styled-components";

export default function ProjectBox({ img, title, text, action }) {
  return (
    <Wrapper>
      <ImgBtn
        className="animate pointer"
        onClick={action ? () => action() : null}
      >
        <img className="rounded max-h-50" src={img} alt="project" />
      </ImgBtn>
      <h3 className="font20 extraBold text-center">{title}</h3>
      <p className="font13 text-center">{text}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 8px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: white;

  &:hover {
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }

  h3 {
    padding-bottom: 10px;
    color: #0b093b;
  }

  p {
    color: #707070;
    line-height: 1.6;
  }
`;

const ImgBtn = styled.button`
  background-color: transparent;
  border: 0;
  outline: none;
  padding: 0;
  margin: 0;
  width: 100%;
  cursor: pointer;

  &:hover > img {
    opacity: 0.8;
    transform: scale(1.05);
    transition: all 0.3s ease;
  }

  img {
    transition: all 0.3s ease;
  }
`;
