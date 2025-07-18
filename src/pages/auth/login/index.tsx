import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { IconUser, IconLock, IconBrandSlack, IconBrandGoogleFilled, IconBrandGithubFilled } from '@tabler/icons-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from '@ui/Image';
import Input from '@ui/Input';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import { Checkbox } from '@ui/Checkbox';
import Link from '@ui/Link';
import Segment from '@ui/Segment';
import Show from '@ui/Show';
import Divider from '@ui/Divider';
import FormField from '@/components/business/FormField';
import loginPortrait from '@/assets/images/login-portrait.webp';
import { useLogin } from '@/hooks';

interface LoginInput {
  username: string;
  password: string;
}
export default function Login() {
  const [psdChecked, setPsdChecked] = useState(true);
  const [loginWay, setLoginWay] = useState<string>('account-login');
  const { login } = useLogin();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    defaultValues: {
      username: 'admin',
      password: 'admin'
    }
  });

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    console.log('username:', data.username, 'password:', data.password, 'remember password:', psdChecked);
    if (data.username === 'admin' && data.password === 'admin') {
      login(true);
      navigate('/');
    }
  };
  return (
    <div className="flex h-screen">
      <Image src={loginPortrait} className="hidden h-full flex-1 md:block" />
      <div className="flex w-full flex-col items-center justify-center md:w-[45%]">
        <Heading as="h3" className="mb-5">
          {t('banner.loginTitle')}
        </Heading>
        <div className="w-[80%] sm:w-[45%] sm:min-w-80">
          <Segment
            equaledWidth
            className="mb-4 w-full"
            onValueChange={setLoginWay}
            options={[
              { label: t('common.accountLogin'), value: 'account-login' },
              { label: t('common.qrCodeLogin'), value: 'qrcode-login' }
            ]}
          />
          <Show when={loginWay === 'account-login'}>
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField hiddenLabel required errorMsg="username is required" showError={errors.username}>
                  <Input state={errors.username && 'error'} {...register('username', { required: true })} autoComplete="off" placeholder="username:admin" prefix={<IconUser size={20} />} />
                </FormField>
                <FormField hiddenLabel required errorMsg="password is required" showError={errors.password}>
                  <Input
                    state={errors.password && 'error'}
                    {...register('password', { required: true })}
                    type="password"
                    autoComplete="off"
                    placeholder="password:admin"
                    prefix={<IconLock size={20} />}
                  />
                </FormField>
                <div className="mt-1 flex justify-between text-sm">
                  <Checkbox size="sm" checked={psdChecked} id="remember-password" onCheckedChange={(checked: boolean) => setPsdChecked(checked)}>
                    {t('common.rememberPsd')}
                  </Checkbox>
                  <Link href="/forgot-password">{t('common.forgetPsd')}</Link>
                </div>
                <Button type="submit" className="mt-6 w-full">
                  {t('actions.login')}
                </Button>
              </form>
              <Divider className="text-description">{t('longText.tips.orContinueWith')}</Divider>
              <div className="flex items-center justify-center gap-4">
                <Button size="sm" asIcon colors="neutral" name="slack" variant="light">
                  <IconBrandSlack size={18} />
                </Button>
                <Button size="sm" asIcon name="github" colors="neutral" variant="light">
                  <IconBrandGithubFilled size={18} />
                </Button>
                <Button size="sm" asIcon name="google" colors="neutral" variant="light">
                  <IconBrandGoogleFilled size={18} />
                </Button>
              </div>
            </>
          </Show>
          <Show when={loginWay === 'qrcode-login'}>
            <>
              <div className="border-line mx-auto size-59 rounded border bg-white p-4">
                <QRCodeSVG className="size-full" value="https://nexus-starter.netlify.app/" />
              </div>
              <p className="text-description mt-2 text-center text-sm">{t('longText.tips.qrcodeLogin')}</p>
            </>
          </Show>
        </div>
      </div>
    </div>
  );
}
