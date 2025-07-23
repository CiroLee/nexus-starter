import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useMockStore } from '@/store/mock';
import { Breadcrumb, BreadcrumbItem } from '@ui/Breadcrumb';
import FormField from '@/components/business/FormField';
import Input from '@ui/Input';
import Button from '@ui/Button';
import Select from '@ui/Select';
import { RadioGroup, Radio } from '@ui/RadioGroup';
import NumberInput from '@ui/NumberInput';
import { mailRegex } from '@/utils/regexp';
import { StaffItem } from '@/types/user';
import { positionOptions, roleOptions } from '@/utils/constants';
import DynamicTrans from '@/components/business/DynamicTrans';

export default function EditStaffPage() {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const { staffList } = useMockStore();
  const staff = staffList.find((item) => item.id === userId);

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<StaffItem>({
    defaultValues: staff
  });

  const handleSave: SubmitHandler<StaffItem> = (data) => {
    console.log(data);
    toast.success(t('toast.updateSucceed'), { position: 'top-right' });
  };

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbItem asChild>
          <Link to="/user-management/staff">{t('menus.userManagement.staff')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{t('actions.edit')}</BreadcrumbItem>
      </Breadcrumb>
      <div className="panel">
        <form className="mx-auto w-full md:max-w-120" onSubmit={handleSubmit(handleSave)}>
          <FormField id="userName" name={t('account.profile.name')} required showError={errors.username} errorMsg="username cannot be empty">
            <Input state={errors.username && 'error'} id="userName" className="[&_input]:capitalize" {...register('username', { required: true, validate: (value) => value.length > 0 })} />
          </FormField>
          <FormField id="corpEmail" name={t('account.profile.corpEmail')} required showError={errors.corpEmail} errorMsg="Please input a valid email">
            <Input state={errors.corpEmail && 'error'} id="userName" {...register('corpEmail', { required: true, pattern: mailRegex })} />
          </FormField>
          <FormField id="contact" name={t('account.profile.contract')} required showError={errors.contract} errorMsg="Please choose a valid contact">
            <Controller
              name="contract"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full md:w-50"
                  onValueChange={(value) => field.onChange(value)}
                  items={[
                    { id: 'full-time', label: t('common.fullTime'), value: 'full-time' },
                    { id: 'part-time', label: t('common.partTime'), value: 'part-time' },
                    { id: 'internship', label: t('common.internship'), value: 'internship' }
                  ]}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField id="positionLevel" name={t('account.profile.positionLevel')}>
            <Controller
              name="positionLevel"
              control={control}
              render={({ field: { onChange, ...rest } }) => (
                <NumberInput
                  id="positionLevel"
                  className="w-full md:w-50"
                  min={1}
                  max={12}
                  onChange={(e) => onChange(Number(e.target.value))}
                  onStepperAction={(_, value) => onChange(value)}
                  state={errors.positionLevel && 'error'}
                  {...rest}
                />
              )}
            />
          </FormField>
          <FormField id="position" name={t('account.profile.position')}>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full md:w-50"
                  onValueChange={(value) => field.onChange(value)}
                  items={positionOptions.map((p) => ({ id: p.value, label: <DynamicTrans>{`position.${p.label}`}</DynamicTrans>, value: p.value }))}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField id="status" name={t('account.profile.employeeStatus')}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={(value) => field.onChange(value)} {...field}>
                  <Radio id="employed" value="employed">
                    {t('status.employed')}
                  </Radio>
                  <Radio id="resigned" value="resigned">
                    {t('status.resigned')}
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormField>
          <FormField id="role" name={t('auth.role.title')}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={(value) => field.onChange(value)} {...field}>
                  {roleOptions.map((role) => (
                    <Radio key={role.value} id={role.value} size="sm" value={role.value}>
                      <DynamicTrans>{`auth.role.${role.label}`}</DynamicTrans>
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            />
          </FormField>
          <FormField id="sex" name={t('account.profile.sex')}>
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <RadioGroup onValueChange={(value) => field.onChange(value)} {...field}>
                  <Radio id="male" value="male">
                    {t('common.male')}
                  </Radio>
                  <Radio id="female" value="female">
                    {t('common.female')}
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormField>
          <div className="mt-4 flex justify-end gap-3">
            <Button type="button" colors="neutral" onClick={() => reset()}>
              {t('actions.reset')}
            </Button>
            <Button type="submit">{t('actions.update')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
