import React from "react";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/img/homelogo.jpg";
import QuotesIcon from "../../assets/svg/Quotes";
import Dots from "../../assets/svg/Dots";

export default function Header() {
  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold font60">مرحباً بكم في</h1>
          <h1
            style={{ marginTop: "10px", padding: "3px" }}
            className="block text-4xl font-bold w-28 text-center bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg px-3 py-1"
          >
            راحتي
          </h1>

          <HeaderP className="font13 semiBold">
            مرحبًا بكم في{" "}
            <strong className=" bg-linear-to-r from-blue-600 to-purple-600 text-white  ">
              {" "}
              راحتي
            </strong>
            ، وجهتكم الأولى لتوفير عاملات منزليات موثوقات، مُدرّبات، ومؤهلات
            لخدمتكم بكل احترافية. نقدّم حلولاً منزلية متكاملة تساعدكم على إدارة
            أعمالكم اليومية بسهولة وراحة، مع التزام كامل بالأمان، والجودة،
            والسرعة في تقديم الخدمة. نوفر خيارات متعددة من العاملات بمختلف
            الخبرات والجنسيات، مع عقود مرنة، زيارات فورية، ودعم متواصل لضمان
            راحتكم.
          </HeaderP>
          <BtnWrapper>
            <FullButton title="احجز الان" />
          </BtnWrapper>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Img
            className="radius8"
            src={HeaderImage}
            alt="office"
            style={{ zIndex: 9 }}
          />
          {/* <QuoteWrapper className="flexCenter darkBg radius8">
            <QuotesWrapper>
              <QuotesIcon />
            </QuotesWrapper>
            <div>
              <p className="font15 whiteColor">
                <em>
                  Friends, such as we desire, are dreams and fables. Friendship
                  demands the ability to do without it.
                </em>
              </p>
              <p
                className="font13 orangeColor textRight"
                style={{ marginTop: "10px" }}
              >
                Ralph Waldo Emerson
              </p>
            </div>
          </QuoteWrapper> */}
          <DotsWrapper>
            <Dots />
          </DotsWrapper>
        </ImageWrapper>
        <GreyDiv className="lightBg"></GreyDiv>
      </RightSide>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
    margin-bottom: 50px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  text-align: center;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
const QuoteWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: -100px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -120px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;
