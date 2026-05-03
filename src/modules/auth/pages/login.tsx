import LoginForm from '../components/login-form';
import AuthSplitShell from '../components/auth-split-shell';

const Login = () => {
  return (
    <AuthSplitShell variant='login'>
      <LoginForm />
    </AuthSplitShell>
  );
};

export default Login;
