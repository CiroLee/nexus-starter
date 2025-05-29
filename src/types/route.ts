import type { RouteObject } from 'react-router-dom';

export type CustomRoute = RouteObject & {
  children?: CustomRoute[];
  meta?: {
    name: string;
    icon?: React.ReactNode;
    visible?: boolean;
    defaultOpen?: boolean; // for collapse menu
  };
};
