import SyncLoader from 'react-spinners/SyncLoader'

const sizes = {
  xs: 10,
  sm: 15,
  md: 20,
  lg: 25,
  xl: 30,
}

export const Spinner = ({ size = 'md' }) => {
  return (
    <>
      <SyncLoader
        color={'teal'}
        loading={true}
        size={sizes[size]}
        speedMultiplier={0.75}
        margin={8}
      />
    </>
  )
}