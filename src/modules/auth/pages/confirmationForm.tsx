import ConfirmationTempalte from '../components/confirmation-template';
import AuthFlowPageShell from '../components/auth-flow-page-shell';

const ConfirmationForm = () => {
  return (
    <AuthFlowPageShell wide>
      <ConfirmationTempalte />
    </AuthFlowPageShell>
  );
};

export default ConfirmationForm;
