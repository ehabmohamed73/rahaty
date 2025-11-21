import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/img/ho2.jpg";
import Dots from "../../assets/svg/Dots";

export default function Header() {
  return (
    <Wrapper id="home" className="flexSpaceCenter">
      {/* الخلفية مع الصورة */}
      <BackgroundImage src={HeaderImage} alt="background" />

      {/* طبقة شفافة فوق الصورة */}
      <Overlay />

      {/* المحتوى فوق الطبقة الشفافة */}
      <ContentWrapper className="text-right">
        <div>
          <HeaderP className="text-4xl text-right semiBold text-white">
            لا مكان للفوضى بعد اليوم. نحن نهتم بتنظيف منزلك كما لو كان ملكنا
          </HeaderP>
        </div>
      </ContentWrapper>

      {/* العناصر الزخرفية */}
      <DotsWrapper>
        <Dots />
      </DotsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: end;
  justify-content: center;
  overflow: hidden;
  margin: 0;
  padding: 0;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 2;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  text-align: right;
  padding: 0 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const HeaderP = styled.div`
  max-width: 600px;
  line-height: 3rem;
  text-align: right;
  margin-right: 120px;
  margin-left: auto;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    padding: 20px 0 30px 0;
    line-height: 2rem;
    font-size: 24px;
    max-width: 100%;
    text-align: center;
    margin-right: 0px;
  }

  @media (max-width: 480px) {
    line-height: 1.8rem;
    font-size: 20px;
  }
`;

const DotsWrapper = styled.div`
  position: absolute;
  right: -50px;
  bottom: 100px;
  z-index: 4;

  @media (max-width: 960px) {
    right: 50px;
    bottom: 50px;
  }

  @media (max-width: 560px) {
    display: none;
  }
`;
