import JAButton from '@/shadcn/atoms/ja-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/ui/form';
import { Input } from '@/shadcn/components/ui/input';
import { Checkbox } from '@/shadcn/components/ui/checkbox';
import { Button } from '@/shadcn/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useTranslations } from 'use-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from '../../services/authApi';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/components/ui/card';

const SignupForm = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const { toast } = useToast();

  const signupFormSchema = z
    .object({
      first_name: z.string().min(1, { message: t('signup.name_required') }),
      last_name: z.string().min(1, { message: t('signup.name_required') }),
      email: z
        .string()
        .email({ message: t('signup.email_validation') })
        .min(1, { message: t('signup.email_required') }),
      password: z.string().min(6, { message: t('signup.password_length') }),
      accept_terms: z.literal(true, {
        errorMap: () => ({ message: t('signup.terms_validation') }),
      }),
    })
    .required();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      accept_terms: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      await registerUser({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
      }).unwrap();

      toast({
        title: t('signup.confirm_email_sent'),
        variant: 'default',
      });
      navigate('/confirmation');
    } catch (error: any) {
      return toast({
        title: t(`${error?.data.error_code}`),
        variant: 'destructive',
      });
    }
  };

  const goToLoginPage = () => navigate(`/login`);

  return (
    <Card className='glass-panel border-primary/20 shadow-glow-sm'>
      <CardHeader className='space-y-1 pb-2'>
        <CardTitle className='text-2xl font-bold tracking-tight md:text-3xl'>{t('signup.title')}</CardTitle>
        <CardDescription className='text-base'>{t('signup.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 pt-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <div className='grid gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-foreground/90'>{t('signup.first_name_label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('signup.first_name_label')}
                        {...field}
                        className='h-11 rounded-xl border-border/80 bg-background/50 focus-visible:ring-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-foreground/90'>{t('signup.last_name_label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('signup.last_name_label')}
                        {...field}
                        className='h-11 rounded-xl border-border/80 bg-background/50 focus-visible:ring-primary'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                      className='h-11 rounded-xl border-border/80 bg-background/50 focus-visible:ring-primary'
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
                      className='h-11 rounded-xl border-border/80 bg-background/50 focus-visible:ring-primary'
                      autoComplete='new-password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='accept_terms'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-start gap-3 rounded-xl border border-border/60 bg-background/30 p-3'>
                      <Checkbox
                        id='terms'
                        name='accept_terms'
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          return checked;
                        }}
                        className='mt-0.5 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                      />
                      <label
                        htmlFor='terms'
                        className='text-sm leading-snug text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {t('signup.accept')}{' '}
                        <Link
                          to='/agb'
                          className='font-medium text-primary underline-offset-4 hover:underline'
                        >
                          {t('signup.terms_and_conditions')}
                        </Link>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <JAButton
              type='submit'
              variant='default'
              className='!w-full'
              disabled={isLoading}
            >
              {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
              {t('signup.join_now')}
            </JAButton>
          </form>
        </Form>

        <p className='text-center text-sm text-muted-foreground'>
          {t('signup.already_account')}{' '}
          <Button
            variant='link'
            className='h-auto p-0 font-semibold text-primary'
            onClick={goToLoginPage}
          >
            {t('signup.login')}
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
