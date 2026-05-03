import ForgotPasswordEmailForm from '../components/forgot-password-email-form';
import AuthFlowPageShell from '../components/auth-flow-page-shell';

const ForgotPasswordEmailPage = () => {
  return (
    <AuthFlowPageShell>
      <ForgotPasswordEmailForm />
    </AuthFlowPageShell>
  );
};

export default ForgotPasswordEmailPage;
