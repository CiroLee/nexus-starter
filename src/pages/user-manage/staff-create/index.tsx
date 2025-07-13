import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '@ui/Input';
import Button from '@ui/Button';
import { RadioGroup, Radio } from '@ui/RadioGroup';
import Select from '@ui/Select';
import NumberInput from '@ui/NumberInput';
import DatePicker from '@ui/DatePicker';
import { Breadcrumb, BreadcrumbItem } from '@ui/Breadcrumb';
import FormField from '@/components/business/FormField';
import { StaffItem } from '@/types/user';
import { positionOptions, roleOptions } from '@/utils/constants';
import DynamicTrans from '@/components/business/DynamicTrans';

export default function StaffCreatePage() {
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<StaffItem>({
    defaultValues: {
      role: 'user'
    }
  });

  const addStaff: SubmitHandler<StaffItem> = (data) => {
    console.log(data);
    toast.success(t('toast.createSucceed'), { position: 'top-center' });
  };
  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbItem asChild>
          <Link to="/user-management/staff">{t('menus.userManagement.staff')}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{t('account.create')}</BreadcrumbItem>
      </Breadcrumb>
      <div className="panel">
        <form className="mx-auto w-full md:w-80" onSubmit={handleSubmit(addStaff)}>
          <FormField id="username" name={t('account.profile.name')} required showError={errors.username} errorMsg="username is required">
            <Input state={errors.username && 'error'} id="username" {...register('username', { required: true, maxLength: 20 })} />
          </FormField>
          <FormField id="sex" name={t('account.profile.sex')} required showError={errors.sex} errorMsg="sex is required">
            <Controller
              name="sex"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup onValueChange={(value) => field.onChange(value)} {...field}>
                  <Radio id="male" value="male" size="sm">
                    {t('common.male')}
                  </Radio>
                  <Radio id="female" value="female" size="sm">
                    {t('common.female')}
                  </Radio>
                </RadioGroup>
              )}
            />
          </FormField>
          <FormField id="position" name={t('account.profile.position')} required showError={errors.position} errorMsg="position is required">
            <Controller
              name="position"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  className="w-full"
                  onValueChange={(value) => field.onChange(value)}
                  items={positionOptions.map((p) => ({ id: p.value, label: <DynamicTrans>{`position.${p.label}`}</DynamicTrans>, value: p.value }))}
                  {...field}
                />
              )}
            />
          </FormField>
          <FormField id="positionLevel" name={t('account.profile.positionLevel')} required showError={errors.positionLevel} errorMsg="positionLevel is required">
            <Controller
              name="positionLevel"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, ...rest } }) => (
                <NumberInput
                  id="positionLevel"
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
          <FormField id="contact" name={t('account.profile.contract')} required showError={errors.contract} errorMsg="Please choose a valid contact">
            <Controller
              name="contract"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  className="w-full"
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
          <FormField id="startTime" name={t('account.profile.startDate')} required showError={errors.startDate} errorMsg="Please choose a valid start date">
            <Controller name="startDate" control={control} render={({ field }) => <DatePicker className="w-full" onValueChange={(value) => field.onChange(value)} />} />
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
          <div className="mt-4 flex gap-2">
            <Button type="submit">{t('actions.submit')}</Button>
            <Button type="button" colors="neutral" asChild>
              <Link to="/user-management/staff">{t('actions.cancel')}</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
