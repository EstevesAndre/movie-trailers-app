import { lazyImport } from '@/utils/lazyImport'

const { AvailableRoutes } = lazyImport(() => import('./AvailableRoutes'), 'AvailableRoutes')


/**
 * Application routes extracted to a separated component so that is more flexible to the implementation of authentication
 * 
 * In this case there is only routes available to all users (no authentication enabled)
 * */
export const AppRoutes = () => {
  return <AvailableRoutes />
}