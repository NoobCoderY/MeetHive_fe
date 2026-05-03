import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/shadcn/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';
import JAButton from '@/shadcn/atoms/ja-button';
import { Button } from '@/shadcn/components/ui/button';
import { useTranslations } from 'use-intl';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../auth-slice';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../services/authApi';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/components/ui/card';

const LoginForm = () => {
  const t = useTranslations();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { toast } = useToast();

  const loginFormSchema = z
    .object({
      email: z
        .string()
        .email({ message: t('signup.email_validation') })
        .min(1, { message: t('signup.email_required') }),
      password: z.string().min(1, { message: t('signup.password_required') }),
    })
    .required();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const { data: userData } = await loginUser({
        email: values.email,
        password: values.password,
      }).unwrap();
      const {
        id,
        username,
        email,
        first_name,
        last_name,
        profile_picture,
        access_token,
        refresh_token,
      } = userData;

      if (userData) {
        dispatch(
          setUser({
            user: {
              id,
              username,
              email,
              first_name,
              last_name,
              group: [],
              profile_picture: profile_picture || null,
            },
            token: { accessToken: access_token, refreshToken: refresh_token },
          })
        );
        toast({
          title: t('login.login_success'),
          variant: 'default',
        });
        navigate('/companyregistration');
      }
    } catch (error: any) {
      toast({
        title: `${error?.data?.error}`,
        variant: 'destructive',
      });
    }
  };

  const goToSignupPage = () => navigate(`/signup`);

  function goToForgotPage(): void {
    navigate('/forgot-password');
  }

  return (
    <Card className='glass-panel border-primary/20 shadow-glow-sm'>
      <CardHeader className='space-y-1 pb-2'>
        <CardTitle className='text-2xl font-bold tracking-tight md:text-3xl'>{t('login.title')}</CardTitle>
        <CardDescription className='text-base'>{t('login.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 pt-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground/90'>{t('signup.email_label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('signup.email_label')}
                      {...field}
                      className='h-11 rounded-xl border-border/80 bg-background/50 transition-colors focus-visible:ring-primary'
                      autoComplete='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-foreground/90'>{t('signup.password_label')}</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder={t('signup.password_label')}
                      {...field}
                      className='h-11 rounded-xl border-border/80 bg-background/50 transition-colors focus-visible:ring-primary'
                      autoComplete='current-password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end'>
              <Button
                type='button'
                variant='link'
                className='h-auto px-0 text-sm font-medium text-primary'
                onClick={goToForgotPage}
              >
                {t('login.forgot_password')}
              </Button>
            </div>

            <JAButton
              type='submit'
              variant='default'
              className='!w-full'
              disabled={isLoading}
            >
              {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
              {t('login.title')}
            </JAButton>
          </form>
        </Form>

        <p className='text-center text-sm text-muted-foreground'>
          {t('login.no_account')}{' '}
          <Button
            variant='link'
            className='h-auto p-0 font-semibold text-primary'
            onClick={goToSignupPage}
          >
            {t('login.signup_label')}
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
