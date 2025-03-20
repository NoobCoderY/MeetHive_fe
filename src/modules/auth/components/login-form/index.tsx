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
  /**
   * Handle the form submission asynchronously.
   *
   * @param {z.infer<typeof loginFormSchema>} values - The values submitted in the form.
   * @return {Promise<void>} A promise that resolves when the form submission is complete.
   */
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const {data: userData} = await loginUser({
        email: values.email,
        password: values.password,
      }).unwrap();
      const { id, username, email, first_name, last_name, profile_picture, access_token, refresh_token, } = userData;

      if (userData) {
        dispatch(
          setUser({
            user: {id,username,email,first_name,last_name,group: [],profile_picture: profile_picture || null},
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
    <div className='w-full'>
      <div>
        <h1 className='text-4xl mb-2 font-light'>{t('login.title')}</h1>
        <h3 className='text-xl mb-4 font-extralight'>{t('login.subtitle')}</h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signup.email_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('signup.email_label')}
                    {...field}
                    className='!bg-none'
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
                <FormLabel>{t('signup.password_label')}</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder={t('signup.password_label')}
                    {...field}
                    className='!bg-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='my-2 text-end'>
            <Button
              variant='link'
              onClick={() => {
                goToForgotPage;
              }}
            >
              {t('login.forgot_password')}
            </Button>
          </div>

          <div className='!mt-[1.5rem]'>
            <JAButton
              type='submit'
              variant='outline'
              className='!w-full'
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              {t('login.title')}
            </JAButton>
          </div>
        </form>
      </Form>
      <p>
        {t('login.no_account')} &nbsp;
        <Button
          variant='link'
          onClick={goToSignupPage}
        >
          {t('login.signup_label')}
        </Button>
      </p>
    </div>
  );
};

export default LoginForm;
