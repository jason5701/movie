import styled from 'styled-components';
import { calcTitme, convertMoney } from '../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100px;
  background: var(--darkGrey);
  padding: 0 20px;
`;

const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  width: 100%;
  margin: 0 auto;
  .column {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--medGrey);
    border-radius: 20px;
    margin: 0 20px;
    flex: 1;
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 768px) {
    display: block;
    .column {
      margin: 20px 0;
    }
  }
`;

interface MovieInfobarProps {
  time: number;
  budget: number;
  revenue: number;
}

const MovieInfobar = ({ time, budget, revenue }: MovieInfobarProps) => {
  return (
    <Wrapper>
      <Content>
        <div className='column'>
          <p>Running time: {calcTitme(time)}</p>
        </div>
        <div className='column'>
          <p>Budget: {convertMoney(budget)}</p>
        </div>
        <div className='column'>
          <p>Revenue: {convertMoney(revenue)}</p>
        </div>
      </Content>
    </Wrapper>
  );
};

export default MovieInfobar;
