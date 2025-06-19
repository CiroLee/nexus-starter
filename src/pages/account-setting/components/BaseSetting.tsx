import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { IconCamera } from '@tabler/icons-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUserStore } from '@/store/user';
import { Avatar } from '@ui/Avatar';
import Button from '@ui/Button';
import FormField from '@/components/business/FormField';
import Input from '@ui/Input';
import Textarea from '@ui/Textarea';
import { mailRegex } from '@/utils/regexp';

interface AccountForm {
  avatarFile: File | null;
  email: string;
  username: string;
  contact: string;
  bio?: string;
}

export default function BaseSetting() {
  const { t } = useTranslation();
  const { userInfo } = useUserStore();
  const [inputKey, setInputKey] = useState<number>(0);
  const [avatarImg, setAvatarImg] = useState<string>(userInfo.avatarUrl);
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<AccountForm>({
    defaultValues: {
      avatarFile: null,
      email: userInfo.email,
      username: userInfo.username,
      contact: userInfo.contact,
      bio: userInfo.bio
    }
  });

  const handleSave: SubmitHandler<AccountForm> = (data) => {
    console.log(data);
    toast.success('update success', { position: 'top-center' });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('avatarFile', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImg(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      // reset input by changing key
      setInputKey((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setAvatarImg(userInfo.avatarUrl);
    reset();
  };
  return (
    <form className="w-full md:ml-10 md:max-w-120" onSubmit={handleSubmit(handleSave)}>
      <div className="relative mb-6 size-20">
        <input type="file" key={inputKey} accept="image/*" className="absolute inset-0 z-10 cursor-pointer opacity-0" onChange={handleAvatarUpload} />
        <Avatar src={avatarImg} className="size-full" />
        <div className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-600">
          <IconCamera size={16} />
        </div>
      </div>
      <FormField id="email" name="Email" required showError={errors.email} errorMsg="Please inout a valid email">
        <Input state={errors.email && 'error'} id="email" {...register('email', { required: true, pattern: mailRegex })} />
      </FormField>
      <FormField id="username" name="Username" required showError={errors.username} errorMsg="Please inout a valid username">
        <Input state={errors.username && 'error'} id="username" {...register('username', { required: true, maxLength: 20 })} />
      </FormField>
      <FormField id="contact" name="Contact" required showError={errors.contact} errorMsg="Please inout a valid contact">
        <Input state={errors.contact && 'error'} id="contact" {...register('contact', { required: true })} />
      </FormField>
      <FormField id="bio" name="Bio">
        <Textarea resize="vertical" id="bio" rootClassName="w-full sm:w-120" {...register('bio', { maxLength: 200 })} />
      </FormField>
      <div className="mt-4 flex items-center justify-end gap-2">
        <Button type="button" colors="neutral" onClick={handleReset}>
          {t('common.reset')}
        </Button>
        <Button type="submit">{t('common.update')}</Button>
      </div>
    </form>
  );
}
