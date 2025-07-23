import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Dialog, DialogClose } from '@ui/Dialog';
import { CustomerInfo } from '@/types/user';
import FormField from '@/components/business/FormField';
import Input from '@ui/Input';
import Button from '@ui/Button';
import { RadioGroup, Radio } from '@ui/RadioGroup';
import { mailRegex, phoneRegex } from '@/utils/regexp';
import Select from '@/components/ui/Select';
import { zhNames } from '@/_mock/constant';

interface CreateDialogProps {
  trigger?: React.ReactNode;
}
export default function CreateDialog({ trigger }: CreateDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<CustomerInfo>({
    defaultValues: {
      memberType: 'ordinary'
    }
  });
  const { t } = useTranslation();

  const handleOnOpenChange = (open: boolean) => {
    reset();
    setOpen(open);
  };
  const handleConfirm: SubmitHandler<CustomerInfo> = (data) => {
    setOpen(false);
    toast.success(t('toast.createSucceed'), { position: 'top-right' });
    console.log('create customer:', data);
  };
  return (
    <Dialog trigger={trigger} open={open} onOpenChange={handleOnOpenChange} title={t('customers.create')} hideFooter>
      <div className="">
        <form className="px-4 pt-6" onSubmit={handleSubmit(handleConfirm)}>
          <FormField id="name" name={t('customers.profile.name')} required showError={errors.name} errorMsg="name is required">
            <Input {...register('name', { required: true })} />
          </FormField>
          <FormField id="sex" name={t('customers.profile.sex')} required showError={errors.sex} errorMsg="please choose a sex item">
            <Controller
              name="sex"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup onValueChange={(value) => field.onChange(value)} {...field}>
                  <Radio size="sm" id="male" value="male">
                    {t('common.male')}
                  </Radio>
                  <Radio size="sm" id="female" value="female">
                    {t('common.female')}
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormField>

          <FormField id="phone" name={t('customers.profile.phone')} required showError={errors.phone} errorMsg="please enter 11 digits phone number">
            <Input {...register('phone', { required: true, pattern: phoneRegex })} />
          </FormField>
          <FormField id="address" name={t('customers.profile.address')} required showError={errors.address} errorMsg="address must be less than 150 characters">
            <Input {...register('address', { required: true, maxLength: 150 })} />
          </FormField>
          <FormField id="owner" name={t('customers.profile.owner')} required showError={errors.owner} errorMsg="owner is required">
            <Controller
              name="owner"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Select className="w-full" items={zhNames.map((name, i) => ({ id: i.toString(), label: name, value: name }))} onValueChange={(value) => field.onChange(value)} />}
            />
          </FormField>
          <FormField id="email" name={t('customers.profile.email')} showError={errors.email} errorMsg="please enter valid email">
            <Input
              state={errors.email && 'error'}
              {...register('email', {
                validate: (value) => {
                  if (value) {
                    return mailRegex.test(value);
                  }
                  return true;
                }
              })}
            />
          </FormField>
          <FormField id="memberType" name={t('customers.profile.memberType')}>
            <Controller
              name="memberType"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={(value) => field.onChange(value)} {...field}>
                  <Radio size="sm" id="ordinary" value="ordinary">
                    {t('customers.tags.ordinary')}
                  </Radio>
                  <Radio size="sm" id="vip" value="vip">
                    {t('customers.tags.vip')}
                  </Radio>
                  <Radio size="sm" id="corporate" value="corporate">
                    {t('customers.tags.corporate')}
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormField>
          <div className="mt-4 flex justify-end gap-3">
            <DialogClose>
              <Button colors="neutral" type="button">
                {t('actions.cancel')}
              </Button>
            </DialogClose>
            <Button type="submit">{t('actions.confirm')}</Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
