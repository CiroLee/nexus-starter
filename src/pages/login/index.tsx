import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconLock } from '@tabler/icons-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { cn } from '@/lib/utils';
import Image from '@ui/Image';
import Input from '@ui/Input';
import loginPortrait from '@/assets/images/login-portrait.webp';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import { Checkbox } from '@ui/Checkbox';
import Link from '@ui/Link';
import { useLogin } from '@/hooks';

interface LoginInput {
  username: string;
  password: string;
}
export default function Login() {
  const [psdChecked, setPsdChecked] = useState(true);
  const { setLogin } = useLogin();
  const navigate = useNavigate();
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
      setLogin(true);
      navigate('/');
    }
  };
  return (
    <div className="flex h-screen">
      <Image src={loginPortrait} className="hidden h-full flex-1 md:block" />
      <div className="flex w-full flex-col items-center justify-center md:w-[45%]">
        <Heading as="h4" className="mb-5">
          Login to Nexus-Starter
        </Heading>
        <form className="md:w-[55%]" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input state={errors.username && 'error'} {...register('username', { required: true })} autoComplete="off" placeholder="username:admin" prefix={<IconUser size={20} />} />
            <p className={cn('invisible text-sm text-red-500', { visible: errors.username })}>Username is required</p>
          </div>
          <div>
            <Input state={errors.password && 'error'} {...register('password', { required: true })} type="password" autoComplete="off" placeholder="password:admin" prefix={<IconLock size={20} />} />
            <p className={cn('invisible pt-1 text-sm text-red-500', { visible: errors.password })}>Password is required</p>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <Checkbox size="sm" checked={psdChecked} id="remember-password" onCheckedChange={(checked: boolean) => setPsdChecked(checked)}>
              Remember password
            </Checkbox>
            <Link href="#">Forget password</Link>
          </div>
          <Button type="submit" className="mt-4 w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
