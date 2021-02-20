import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from '@chakra-ui/react';

const CustomNumberInput = ({ value, onChange, min, max, step, precision }) => {
  return (
    <Box
      h={['36px', '50px']}
      sx={{
        input: {
          h: '100%',
          fontSize: ['1rem', '1.4rem'],
        },
        svg: {
          transform: ['scale(1)', 'scale(1.4)'],
        },
      }}
    >
      <NumberInput
        height='100%'
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        precision={precision}
      >
        <NumberInputField borderRadius='10px' px={['10px', '14px']} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
};

export default CustomNumberInput;
