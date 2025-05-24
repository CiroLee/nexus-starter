import { Outlet } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
}
