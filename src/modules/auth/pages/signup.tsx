import SignupForm from '../components/signup-form';
import AuthSplitShell from '../components/auth-split-shell';

const Signup = () => {
  return (
    <AuthSplitShell variant='signup'>
      <SignupForm />
    </AuthSplitShell>
  );
};

export default Signup;
