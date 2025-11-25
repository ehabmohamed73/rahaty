import React from "react";
import styled from "styled-components";
// Components
import ServiceBox from "../Elements/ServiceBox";
import customer from "../../assets/img/customer.svg";
import price from "../../assets/img/price.svg";
import teamwork from "../../assets/img/team.svg";
import listPrice from "../../assets/img/list-price.svg";
export default function Services() {
  return (
    <Wrapper id="offering">
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold text-center">ما نقدمه في راحتي</h1>
          </HeaderInfo>
          <ServiceBoxRow className="flex">
            <ServiceBoxWrapper>
              <ServiceBox
                icon={price}
                title="أفضل الأسعار"
                subtitle="نُقدّم حلول توظيف تناسب جميع الميزانيات. ونستطيع تلبية كل ما تريد، سواء كنت بحاجة إلى مدبرة منزل لزيارة واحدة أم مدبرة منزل دائمة.."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon={listPrice}
                title="شروط مرنة"
                subtitle="في بعض الأحيان، قد تتغير الخطط والمواعيد. يُمكنك تعديل حجزك أو تغييره بسهولة عبر هاتفك الجوال."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon={teamwork}
                title="فريق عمل مُدرّب"
                subtitle="يُدرّب جميع موظفينا بشكل مكثف في الشركة قبل أن يُباشروا العمل في منازلكم."
              />
            </ServiceBoxWrapper>
            <ServiceBoxWrapper>
              <ServiceBox
                icon={customer}
                title="خدمة عملاء استثنائية"
                subtitle="فريقنا المتخصص من المحترفين موجود لتقديم المساعدة والدعم لك في كل خطوة."
              />
            </ServiceBoxWrapper>
          </ServiceBoxRow>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const ServiceBoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 860px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px; /* مسافة بين الصناديق */
  }
`;

const ServiceBoxWrapper = styled.div`
  width: 20%;
  margin-right: 5%;
  padding: 80px 0;
  text-align: center;

  @media (max-width: 860px) {
    width: 100%; /* كل عنصر داخل grid يأخذ كامل عرضه العمود */
    margin-right: 0;
    padding: 20px 0;
  }
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
