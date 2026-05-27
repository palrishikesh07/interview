declare module "header/Header";
declare module "dashboard/Dashboard";
declare module "profile/Profile";

//If your remote components accept props, you can declare them with precise types:


// declare module 'dashboard/Dashboard' {
//   import { ComponentType } from 'react';
//   export interface DashboardProps {
//     userId: string;
//     onRefresh: () => void;
//   }
//   const Dashboard: ComponentType<DashboardProps>;
//   export default Dashboard;
// }


