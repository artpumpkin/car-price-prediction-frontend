import { useMutation } from 'react-query';
import { POST } from 'utils';

const usePrice = () => {
  const { mutateAsync: predict } = useMutation((data) =>
    POST('/predict', data),
  );

  return {
    predict,
  };
};

export default usePrice;
