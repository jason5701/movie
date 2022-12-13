import styled from 'styled-components';

const Wrapper = styled.div`
  color: var(--white);
  background: var(--darkGrey);
  border-radius: 20px;
  padding: 5px;
  text-align: center;
  h3 {
    margin: 10px 0 0 0;
  }
  p {
    margin: 5px 0;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
`;

interface ActorProps {
  name: string;
  character: string;
  imageURL: string;
}

const Actor = ({ name, character, imageURL }: ActorProps) => {
  return (
    <>
      <Wrapper>
        <Image src={imageURL} alt='actor-thumb' />
        <h3>{name}</h3>
        <p>{character}</p>
      </Wrapper>
    </>
  );
};

export default Actor;
