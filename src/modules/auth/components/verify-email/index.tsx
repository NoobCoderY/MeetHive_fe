import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailMutation } from '../../services/authApi';
import { useEffect } from 'react';
import { useTranslations } from 'use-intl';

const VerifyEmail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const t = useTranslations();
  const [verifyEmail] = useVerifyEmailMutation();

  const onSubmit = async () => {
    const verifyData = await verifyEmail({
      token: params?.company_user_token,
    });

    if (verifyData?.data.status === 200) {
      navigate('/login');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      onSubmit();
    }, 4000);
  }, []);

  return (
    <div className='flex justify-center items-center h-[90vh] text-3xl font-bold'>
      {t('signup.signup_verify_email')}
    </div>
  );
};

export default VerifyEmail;
