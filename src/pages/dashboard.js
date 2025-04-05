import { withAuth } from '@/components/auth/withAuth';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default withAuth(Dashboard);