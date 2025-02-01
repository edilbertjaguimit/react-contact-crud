import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ModalDialogProps {
    title: string;
    description?: string;
    trigger?: JSX.Element;
    footer?: JSX.Element;
    body?: JSX.Element;
}

const ModalDialog = ({ title, description, trigger, footer, body }: ModalDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {body}
                <DialogFooter>{footer}</DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalDialog;
