import { Flex } from '@chakra-ui/react';
import { useColor } from 'hooks';
import { ColorMode, CarForm } from './components';

const App = () => {
  const { color } = useColor();

  return (
    <Flex
      pos='relative'
      bgColor={color('primary')}
      w='100%'
      h='100%'
      borderRadius='30px'
      overflow='hidden'
      justify='center'
      align='center'
    >
      <ColorMode />
      <CarForm />
    </Flex>
  );
};

export default App;
