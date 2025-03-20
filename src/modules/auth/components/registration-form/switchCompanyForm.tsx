import React from 'react';
import FirstForm from './firstForm';
import SecondForm from './secondForm';

interface ISwitchCompanyForm {
  selectCompanyForm: number;
  setSelectCompanyForm: React.Dispatch<React.SetStateAction<number>>;
  setCompanyRegistrationFormFieldsState: React.Dispatch<
    React.SetStateAction<
      {
        profession: {
          value: string;
          marked: boolean;
        }[];
        interests: {
          value: string;
          marked: boolean;
        }[];
      }[]
    >
  >;
  companyRegistrationFormFieldsState: {
    profession: {
      value: string;
      marked: boolean;
    }[];
    interests: {
      value: string;
      marked: boolean;
    }[];
  }[];
}

const SwitchCompanyForm = ({
  selectCompanyForm,
  setSelectCompanyForm,
  setCompanyRegistrationFormFieldsState,
  companyRegistrationFormFieldsState,
}: ISwitchCompanyForm) => {
  switch (selectCompanyForm) {
    case 1:
      return (
        <FirstForm
          setSelectCompanyForm={setSelectCompanyForm}
          setCompanyRegistrationFormFieldsState={
            setCompanyRegistrationFormFieldsState
          }
          companyRegistrationFormFieldsState={
            companyRegistrationFormFieldsState
          }
        />
      );
    case 2:
      return (
        <SecondForm
          setSelectCompanyForm={setSelectCompanyForm}
          setCompanyRegistrationFormFieldsState={
            setCompanyRegistrationFormFieldsState
          }
          companyRegistrationFormFieldsState={
            companyRegistrationFormFieldsState
          }
        />
      );
    default:
      return null;
  }
};

export default SwitchCompanyForm;
