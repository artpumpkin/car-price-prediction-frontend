import { Select, Box } from '@chakra-ui/react';

const SelectInput = ({ value, onChange, name, options, placeholder }) => {
  return (
    <Box
      sx={{
        '.chakra-select__wrapper': {
          h: '100% !important',
        },
        '.chakra-select': {
          px: ['10px', '14px'],
        },
        svg: {
          transform: ['scale(1.5)', 'scale(2)'],
        },
        '.chakra-select__icon-wrapper': {
          mr: ['6px', '10px'],
        },
      }}
      h={['36px', '50px']}
    >
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        h='100%'
        fontSize={['1rem', '1.4rem']}
        borderRadius='10px'
      >
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectInput;
