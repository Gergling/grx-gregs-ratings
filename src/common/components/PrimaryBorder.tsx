import styled from '@emotion/styled';

// TODO: Absolutely needs to go into the component library.
export const PrimaryBorder = styled.div`
  border-color: ${({ theme: { colors: { primary: { main } } } }) => main};
  border-radius: 1rem;
  border-style: solid;
  border-width: 0.25rem;
`;
