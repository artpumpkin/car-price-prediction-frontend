import { Flex } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
import { useColor } from 'hooks';

const Loader = ({ isLoading, loaderColor, ...rest }) => {
  const { pickAlpha } = useColor();

  return (
    <>
      {isLoading && (
        <Flex height='100%' textAlign='center' {...rest}>
          <ScaleLoader
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
            width='5px'
            height='24px'
            color={loaderColor || pickAlpha(0.4, 0.4)}
            loading={isLoading}
          />
        </Flex>
      )}
    </>
  );
};

export default Loader;
