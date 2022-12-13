import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
import apiSettings from '../api';

const Wrapper = styled.div`
  align-items: center;
  height: 100px;
  background: var(--darkGrey);
  padding: 0 20px;
`;

const Content = styled.div`
  position: relative;
  max-width: var(--maxWidth);
  width: 100%;
  height: 55px;
  background: var(--medGrey);
  margin: 0 auto;
  border-radius: 40px;
  color: var(--white);
  img {
    position: absolute;
    left: 15px;
    top: 14px;
    width: 30px;
  }
  input {
    font-size: var(--fontBig);
    position: absolute;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 60px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 40px;
    color: var(--white);
    :focus {
      outline: none;
    }
  }
`;

interface SearchBarProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const Searchbar = ({ setSearchTerm }: SearchBarProps) => {
  const [state, setState] = useState('');
  const init = useRef(true);

  useEffect(() => {
    if (init.current) {
      init.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <>
      <Wrapper>
        <Content>
          {/* <BsSearch /> */}
          <input
            type='text'
            placeholder='검색어를 입력하세요.'
            onChange={(event) => setState(event.currentTarget.value)}
            value={state}
          />
        </Content>
      </Wrapper>
    </>
  );
};

export default Searchbar;
