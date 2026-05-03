import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailMutation } from '../../services/authApi';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'use-intl';
import { Loader2, ShieldCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';

const VerifyEmail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const t = useTranslations();
  const [verifyEmail] = useVerifyEmailMutation();
  const ran = useRef(false);

  const onSubmit = async () => {
    const verifyData = await verifyEmail({
      token: params?.company_user_token,
    });

    if (verifyData?.data.status === 200) {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const tId = window.setTimeout(() => {
      void onSubmit();
    }, 4000);
    return () => window.clearTimeout(tId);
  }, []);

  return (
    <Card className='glass-panel border-primary/20 shadow-glow-sm'>
      <CardHeader className='space-y-4 text-center'>
        <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10'>
          <ShieldCheck className='h-7 w-7 text-primary' />
        </div>
        <CardTitle className='text-balance text-xl font-bold md:text-2xl'>
          {t('signup.signup_verify_email')}
        </CardTitle>
        <CardDescription className='flex items-center justify-center gap-2 text-sm'>
          <Loader2 className='h-4 w-4 animate-spin text-primary' />
          Verifying your email…
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-center text-sm text-muted-foreground'>
          You&apos;ll be redirected to sign in when verification completes.
        </p>
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;
