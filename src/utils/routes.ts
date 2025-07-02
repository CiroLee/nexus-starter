import { CustomRoute } from '@/types/route';

export function filterVisibleRoutes(routes: CustomRoute[]): CustomRoute[] {
  return routes.reduce<CustomRoute[]>((acc, route) => {
    // If the current route is not visible, skip it directly
    if (route.meta?.visible === false) return acc;

    // Create a base result object without children
    const { children, ...baseResult } = route;
    const result: CustomRoute = { ...baseResult };

    if (children?.length) {
      // Recursively filter child routes
      const filteredChildren = filterVisibleRoutes(children);

      // Only add to the result if the filtered child routes array is not empty
      if (filteredChildren.length) {
        result.children = filteredChildren;
      }
    }

    return [...acc, result];
  }, []);
}
