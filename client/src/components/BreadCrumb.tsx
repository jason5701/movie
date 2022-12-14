import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background: var(--medGrey);
  color: var(--white);
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--maxWidth);
  padding: 0 20px;
  span {
    font-size: var(--fontMed);
    color: var(--white);
    padding-right: 10px;
    @media screen and (max-width: 768px) {
      font-size: var(--fontSmall);
    }
  }
`;

const BreadCrumb = ({ movieTitle }: { movieTitle: string }) => {
  return (
    <>
      <Wrapper>
        <Content>
          <Link to={'/'}>
            <span>Home</span>
          </Link>
          <span>|</span>
          <span>{movieTitle}</span>
        </Content>
      </Wrapper>
    </>
  );
};

export default BreadCrumb;
