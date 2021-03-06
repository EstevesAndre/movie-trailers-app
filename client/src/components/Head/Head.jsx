
import { Helmet } from 'react-helmet'

export const Head = ({ title = '', description = '' }) => {
  const defaultTitle = "Movie Trailers"
  return (
    <Helmet
      title={title ? `${title} | ${defaultTitle}` : undefined}
      defaultTitle={defaultTitle}
    >
      <meta name='description' content={description} />
    </Helmet>
  )
}