import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@ui/Card';
import Heading from '@ui/Heading';
import Input from '@ui/Input';
import logoSvg from '@/assets/images/logo.svg';
import FormField from '@/components/business/FormField';
import { mailRegex } from '@/utils/regexp';
import Button from '@/components/ui/Button';
import Link from '@/components/ui/Link';

interface ForgotPassword {
  email: string;
}
export default function ForgotPassword() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPassword>();
  const onSubmit: SubmitHandler<ForgotPassword> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-6 flex items-center gap-1">
        <img src={logoSvg} alt="logo" className="size-8" />
        <Heading as="h4">Nexus-Starter</Heading>
      </div>
      <Card className="md:w-100">
        <CardHeader className="justify-center">
          <CardTitle className="text-lg">{t('longText.notice.forgotPsdTitle')}?</CardTitle>
        </CardHeader>
        <p className="text-description mb-2 px-4 text-center text-sm">{t('longText.security.forgotPsdText')}</p>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField showError={errors.email} errorMsg="Please input a valid email">
              <Input {...register('email', { required: true, pattern: mailRegex })} placeholder="please enter your email" />
            </FormField>
            <Button type="submit" className="mt-2 w-full">
              {t('common.submit')}
            </Button>
          </form>
        </CardBody>
        <CardFooter className="mt-2 justify-center gap-1 text-sm">
          <span>{t('longText.notice.notReceiveCode')}?</span>
          <Link href="#" underline>
            {t('common.resend')}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
