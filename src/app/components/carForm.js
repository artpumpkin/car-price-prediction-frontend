import { useState } from 'react';
import {
  Box,
  Flex,
  chakra,
  Grid,
  GridItem,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
} from '@chakra-ui/react';
import { NumberInput, SelectInput, Loader } from 'features';
import { useColor, usePrice } from 'hooks';
import { alpha, formatPrice } from 'utils';
const marque = [
  { name: 'BMW', value: 0 },
  { name: 'Citroën', value: 1 },
  { name: 'Ford', value: 2 },
  { name: 'Honda', value: 3 },
  { name: 'Hyundai', value: 4 },
  { name: 'Mahindra', value: 5 },
  { name: 'Mercedes-Benz', value: 6 },
  { name: 'Peugeot', value: 7 },
  { name: 'Renault', value: 8 },
  { name: 'Toyota', value: 9 },
  { name: 'Volkswagen', value: 10 },
  { name: 'Other', value: -1 },
];

const fuel = [
  { name: 'Diesel', value: 0 },
  { name: 'Gasoline', value: 1 },
];

const Label = ({ children }) => {
  const { pickAlpha } = useColor();

  return (
    <Box
      color={pickAlpha(0.75, 0.75)}
      mb='10px'
      fontWeight='bold'
      fontSize={['1.2rem', '1.8rem']}
    >
      {children}
    </Box>
  );
};

const CarForm = () => {
  const toast = useToast();
  const { predict } = usePrice();
  const { pick, pickAlpha } = useColor();
  const [values, setValues] = useState({
    marque: '',
    fuel: '',
    mileage: 0.0,
    fiscalPower: 8,
    carAge: new Date().getFullYear(),
    views: 0,
  });
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const data = {
        ...values,
        marque: Array.from({ length: 11 }, (_, index) =>
          index === values.marque ? 1 : 0,
        ),
        carAge: new Date().getFullYear() - values.carAge,
      };

      const { price } = await predict(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
        render: () => (
          <Box bgColor='#03a9f4' p='20px' borderRadius='20px'>
            <Box
              color={alpha('black', 0.7)}
              fontWeight='bold'
              fontSize='2.4rem'
            >
              Predicted Price.
            </Box>
            <Box fontWeight='500' ontSize='2.4rem' color={alpha('black', 0.6)}>
              The model predict that the price of this car is{' '}
              <b>{formatPrice(price.toString())}</b>.
            </Box>
          </Box>
        ),
      });
      setLoading(false);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
        render: () => (
          <Box bgColor='#f44336' p='20px' borderRadius='20px'>
            <Box
              color={alpha('black', 0.7)}
              fontWeight='bold'
              fontSize='2.4rem'
            >
              Form Error.
            </Box>
            <Box fontWeight='500' ontSize='2.4rem' color={alpha('black', 0.6)}>
              Some fields are missing.
            </Box>
          </Box>
        ),
      });
      setLoading(false);
    }
  };

  return (
    <Flex
      bgColor={pick('white', '#1d1d42')}
      minW={['auto', '600px']}
      maxW='800px'
      w={['100%', '80%']}
      borderRadius={['0px', '30px']}
      p={['20px', '30px']}
      boxShadow={`0px 0px 40px ${alpha('black', 0.1)}`}
      flexDir='column'
    >
      <Flex
        flexDir='column'
        align='center'
        mb={['20px', '30px']}
        color={pickAlpha(0.8, 0.8)}
      >
        <Heading>Data Mining Project</Heading>
        <Box fontWeight='500'>Car Price Prediction (Maroc Annonce)</Box>
        <Box fontWeight='500'>Done by LACHKAR Salah-Eddine & BATAL Mossab</Box>
      </Flex>
      <chakra.form w='100%' onSubmit={(e) => e.preventDefault()}>
        <Grid templateColumns='1fr 1fr' gap={['20px', '30px']}>
          <GridItem>
            <Label>Marque</Label>
            <SelectInput
              name='marque'
              placeholder='Marque Options'
              options={marque}
              value={values.marque}
              onChange={(e) =>
                setValues({
                  ...values,
                  marque: e.target.value === '' ? '' : parseInt(e.target.value),
                })
              }
            />
          </GridItem>
          <GridItem>
            <Label>Mileage (km)</Label>
            <NumberInput
              value={values.mileage}
              onChange={(_, mileage) =>
                setValues({
                  ...values,
                  mileage,
                })
              }
              min={0}
              max={999_999}
              step={1}
              precision={2}
            />
          </GridItem>
          <GridItem>
            <Label>Fuel</Label>
            <SelectInput
              name='fuel'
              placeholder='Fuel Options'
              options={fuel}
              value={values.fuel}
              onChange={(e) =>
                setValues({
                  ...values,
                  fuel: e.target.value === '' ? '' : parseInt(e.target.value),
                })
              }
            />
          </GridItem>
          <GridItem>
            <Label>Fiscal Power</Label>
            <Flex align='center' h={['36px', '50px']}>
              <Slider
                value={values.fiscalPower}
                onChange={(fiscalPower) =>
                  setValues({
                    ...values,
                    fiscalPower,
                  })
                }
                min={4}
                max={20}
                step={1}
              >
                <SliderTrack borderRadius='100px'>
                  <SliderFilledTrack bgColor='#03a9f4' />
                </SliderTrack>
                <SliderThumb
                  fontSize={['1.2rem', '1.8rem']}
                  boxSize={['24px', '32px']}
                  children={values.fiscalPower}
                  fontWeight='bold'
                  color={alpha('black', 0.75)}
                />
              </Slider>
            </Flex>
          </GridItem>
          <GridItem>
            <Label>Release Date</Label>
            <NumberInput
              value={values.carAge}
              onChange={(_, carAge) =>
                setValues({
                  ...values,
                  carAge,
                })
              }
              min={1900}
              max={new Date().getFullYear()}
              step={1}
            />
          </GridItem>
          <GridItem>
            <Label>Views</Label>
            <NumberInput
              value={values.views}
              onChange={(_, views) =>
                setValues({
                  ...values,
                  views,
                })
              }
              min={0}
              max={1250}
              step={1}
            />
          </GridItem>
        </Grid>
        <chakra.button
          d='flex'
          justifyContent='center'
          alignItems='center'
          bgColor='#03a9f4'
          color={alpha('black', 0.6)}
          w='100%'
          mt={['20px', '30px']}
          fontWeight='bold'
          fontSize={['1.2rem', '1.8rem']}
          h='70px'
          borderRadius={['15px', '20px']}
          _focus={{ outline: 0 }}
          onClick={onClick}
        >
          {loading ? (
            <Loader isLoading={loading} loaderColor={alpha('black', 0.6)} />
          ) : (
            'PREDICT PRICE'
          )}
        </chakra.button>
      </chakra.form>
    </Flex>
  );
};

export default CarForm;
