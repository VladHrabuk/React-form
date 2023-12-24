import { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';
import SelectField, { SelectProps } from './SelectField';
import "../index.css"

export default {
  title: 'Components/SelectField',
  component: SelectField,
} as Meta;

const Template: StoryFn<SelectProps> = (args) => {
  const { control } = useForm();

  return (
      <SelectField {...args} control={control} name="pokemon" />
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'pokemon',
  label: 'Pokemon',
};


