import type { RouteObject } from 'react-router-dom';

export type CustomRoute = RouteObject & {
  meta?: {
    name: string;
    icon?: React.ReactNode;
    visible?: boolean;
  };
};
