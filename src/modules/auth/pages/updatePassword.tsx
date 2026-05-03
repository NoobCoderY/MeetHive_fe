import UpdatePasswordForm from '../components/update-password';
import AuthFlowPageShell from '../components/auth-flow-page-shell';

const UpdatePassword = () => {
  return (
    <AuthFlowPageShell>
      <UpdatePasswordForm />
    </AuthFlowPageShell>
  );
};

export default UpdatePassword;
