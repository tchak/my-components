import { type FormProps, Form as AriaForm } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function Form(props: FormProps) {
  return <AriaForm {...props} className={twMerge('flex flex-col gap-4', props.className)} />;
}
