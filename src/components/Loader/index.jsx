import { ColorRing } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="60"
      width="60"
      ariaLabel="color-ring-loading"
      wrapperStyle={{ position: 'absolute', top: '50%', left: '49%' }}
      wrapperClass="color-ring-wrapper"
      colors={['#CE74BF', '#ED8FD0', '#F0B1E0', '#F4DAF1', '#F9EFEF']}
    />
  );
};
