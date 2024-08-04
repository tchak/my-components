import { type DialogProps, Dialog as AriaDialog } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export { DialogTrigger } from 'react-aria-components';

export function Dialog(props: DialogProps) {
  return (
    <AriaDialog
      {...props}
      className={twMerge(
        'outline outline-0 p-6 [[data-placement]>&]:p-4 max-h-[inherit] overflow-auto relative',
        props.className,
      )}
    />
  );
}
