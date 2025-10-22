import { Value } from 'react-phone-number-input';
import parse from 'html-react-parser';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import AccountHeader from '../accountHeader/AccountHeader';
import ProfileDataForm from '../profileDataForm/ProfileDataForm';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetState, updateUserData } from '../../features/auth/authSlice';

import { CountrySelectType, ProfileDataProps } from '../../types';
import {
  ProfileDataFormData,
  profileSchema,
} from '../../validations/profileSchema';

import './ProfileData.scss';

const ProfileData = ({
  name,
  email,
  username,
  phone,
  dateOfBirth,
  country,
  bio,
  about,
}: ProfileDataProps) => {
  const dispatch = useAppDispatch();
  const { isError, isLoading, message } = useAppSelector((state) => ({
    ...state.auth,
  }));

  const [telephone, setTelephone] = useState<Value | undefined>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [aboutMe, setAboutMe] = useState<ReactQuill.Value | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileDataFormData>({
    resolver: zodResolver(profileSchema),
  });

  const setCustomValue = useCallback(
    (name: keyof ProfileDataFormData, value: string | CountrySelectType) => {
      setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<ProfileDataFormData> = (data) => {
    const userData = {
      ...data,
      country: (data.country as CountrySelectType).label,
      phone: telephone,
      about: aboutMe,
      dateOfBirth: startDate,
    };

    dispatch(updateUserData(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, isError, message]);

  useEffect(() => {
    setCustomValue('name', name);
    setCustomValue('email', email);
    setCustomValue('username', username);
    setCustomValue('country', country);
    setCustomValue('bio', bio);

    const parsedText = parse(String(about)) as ReactQuill.Value;
    setAboutMe(parsedText);
    setStartDate(dateOfBirth || null);
    setTelephone(phone);
  }, [
    about,
    bio,
    country,
    dateOfBirth,
    email,
    name,
    phone,
    setCustomValue,
    username,
  ]);

  return (
    <div className='profile-data'>
      <AccountHeader
        title='Personal information'
        subtitle='Update your personal information'
      />
      <ProfileDataForm
        about={aboutMe}
        dateOfBirth={dateOfBirth}
        startDate={startDate}
        phone={telephone}
        isLoading={isLoading}
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        onChangeAbout={setAboutMe}
        onChangeCustom={setCustomValue}
        onChangeDate={setStartDate}
        onChangePhone={setTelephone}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default ProfileData;
