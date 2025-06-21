import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconLock } from '@tabler/icons-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from '@ui/Image';
import Input from '@ui/Input';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import { Checkbox } from '@ui/Checkbox';
import Link from '@ui/Link';
import FormField from '@/components/business/FormField';
import loginPortrait from '@/assets/images/login-portrait.webp';
import { useLogin } from '@/hooks';

interface LoginInput {
  username: string;
  password: string;
}
export default function Login() {
  const [psdChecked, setPsdChecked] = useState(true);
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
        <Heading as="h4" className="mb-5">
          {t('banner.loginTitle')}
        </Heading>
        <form className="w-[80%] space-y-1.5 sm:w-[55%] sm:min-w-80" onSubmit={handleSubmit(onSubmit)}>
          <FormField hiddenLabel required errorMsg="username is required" showError={errors.username}>
            <Input state={errors.username && 'error'} {...register('username', { required: true })} autoComplete="off" placeholder="username:admin" prefix={<IconUser size={20} />} />
          </FormField>
          <FormField hiddenLabel required errorMsg="password is required" showError={errors.password}>
            <Input state={errors.password && 'error'} {...register('password', { required: true })} type="password" autoComplete="off" placeholder="password:admin" prefix={<IconLock size={20} />} />
          </FormField>
          <div className="mt-1 flex justify-between text-sm">
            <Checkbox size="sm" checked={psdChecked} id="remember-password" onCheckedChange={(checked: boolean) => setPsdChecked(checked)}>
              {t('common.rememberPsd')}
            </Checkbox>
            <Link href="#">{t('common.forgetPsd')}</Link>
          </div>
          <Button type="submit" className="mt-4 w-full">
            {t('common.login')}
          </Button>
        </form>
      </div>
    </div>
  );
}
