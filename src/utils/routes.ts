import { CustomRoute } from '@/types/route';

export function filterVisibleRoutes(routes: CustomRoute[]): CustomRoute[] {
  return routes
    .map((route) => {
      if (route.meta && route.meta.visible === false) {
        return null;
      }
      const result: CustomRoute = { ...route };
      if (route.children) {
        const filteredChildren = filterVisibleRoutes(route.children);

        if (filteredChildren.length > 0) {
          result.children = filteredChildren;
        }
      }
      return result;
    })
    .filter((route) => route !== null) as CustomRoute[];
}
