import React from "react";
import styled from "styled-components";
import ProjectBox from "../Elements/ProjectBox";
import dayimge from "../../assets/img/day.jpg";
import monthimage from "../../assets/img/month.jpg";
import hospitalityimage from "../../assets/img/ho2.jpg";
import joinusimage from "../../assets/img/joinus.jpg";
import { useNavigate } from "react-router-dom";
export default function Projects() {
  const navigate = useNavigate();
  const projects = [
    {
      img: dayimge,
      path: "/booking-in-day",
      title: "حجز بالساعه",
      text: "خدمة تنظيف شاملة لمنزلك أو مكتبك حسب احتياجاتك بالساعه.",
    },
    {
      img: monthimage,
      path: "/booking-monthly",
      title: "حجز في الشهر",
      text: "خدمة تنظيف دورية لمنزلك أو مكتبك على أساس شهري.",
    },
    {
      img: hospitalityimage,
      path: "/booking-in-day",
      title: "حجز ضيافة",
      text: "خدمة تنظيف متخصصه لضمان بيئة نظيفة وصحية للضيوف.",
    },
    {
      img: joinusimage,
      path: "/join-us",
      title: "انظم الينا",
      text: "انضم إلى فريقنا من المحترفين في التنظيف وابدأ مسيرتك معنا.",
    },
  ];

  return (
    <Wrapper id="services">
      <Container className="container">
        <HeaderInfo>
          <h1 className="font40 extraBold">خدمات تحت الطلب</h1>
          <p className="font13">نفخر بتقديم مجموعة متنوعة من الخدمات</p>
        </HeaderInfo>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectBox
              key={index}
              img={project.img}
              title={project.title}
              text={project.text}
              action={() => navigate(project.path)}
            />
          ))}
        </ProjectsGrid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  max-width: 100vw; /* مهم جداً */
  padding: 80px 0;
  background: #f8f9fa;
  overflow-x: hidden; /* مهم جداً */
  box-sizing: border-box; /* مهم جداً */

  @media (max-width: 860px) {
    padding: 50px 0;
  }
`;

const Container = styled.div`
  max-width: 1220px;
  width: 100%; /* إضافة هذا */
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: border-box; /* مهم جداً */

  @media (max-width: 860px) {
    padding: 0 15px;
  }
`;

const HeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 60px;
  max-width: 100%; /* إضافة هذا */

  h1 {
    margin-bottom: 20px;
    color: #0b093b;
    word-wrap: break-word; /* لو العنوان طويل */
  }

  p {
    color: #707070;
    max-width: 600px;
    margin: 0 auto;
    word-wrap: break-word;
  }

  @media (max-width: 860px) {
    margin-bottom: 40px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  direction: rtl;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  /* تعديل مهم: بدل 1 عمود → خليها 2 أعمدة */
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;
