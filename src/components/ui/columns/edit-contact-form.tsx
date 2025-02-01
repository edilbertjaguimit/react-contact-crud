import { Contact, UpdateContactFormData, updateContactSchema } from '@/models/Contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateContact } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useIsLoadingStore } from '@/stores/IsLoadingStore';

interface EditContactFormProps {
    contact: Contact;
}

const EditContactForm = ({ contact }: EditContactFormProps) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const mutation = useMutation({
        mutationFn: (newContact: UpdateContactFormData) => updateContact(newContact as Contact),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast({
                title: '✅ Contact updated successfully! 🚀',
                description: 'You have successfully updated the contact.',
            });
        },
        onError: (error) => {
            toast({
                title: '❌ Error updating contact',
                description: error.message || 'An error occurred while deleting the contact.',
            });
        },
        onSettled: (data, error, variables, context) => {
            console.log('settled', data, error, variables, context);
            setIsLoading(false);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateContactFormData>({
        resolver: zodResolver(updateContactSchema),
    });

    const { setIsLoading } = useIsLoadingStore();

    const onSubmitContact = async (data: UpdateContactFormData) => {
        console.log('submit update', data);
        setIsLoading(true);
        mutation.mutate(data);
    };
    return (
        <form id='contactFormUpdate' onSubmit={handleSubmit(onSubmitContact)}>
            <div className='grid gap-4 py-4'>
                {/*  Make sure to convert the id to number if it's a number and using react-hook-form and zod */}
                <Input className='col-span-3 hidden' defaultValue={String(contact.contactId)} {...register('contactId', { valueAsNumber: true })} />
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-left'>
                        First Name
                    </Label>
                    <Input className='col-span-3' defaultValue={contact.contactFirstName} {...register('contactFirstName')} />
                    <div className='col-span-3 col-start-2'>
                        {errors.contactFirstName && <span className='text-destructive'>{errors.contactFirstName.message}</span>}
                    </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-left'>
                        Last Name
                    </Label>
                    <Input className='col-span-3' defaultValue={contact.contactLastName} {...register('contactLastName')} />
                    <div className='col-span-3 col-start-2'>
                        {errors.contactLastName && <span className='text-destructive'>{errors.contactLastName.message}</span>}
                    </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-left'>
                        Email
                    </Label>
                    <Input className='col-span-3' defaultValue={contact.contactEmail} {...register('contactEmail')} />
                    <div className='col-span-3 col-start-2'>
                        {errors.contactEmail && <span className='text-destructive'>{errors.contactEmail.message}</span>}
                    </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-left'>
                        Mobile Number
                    </Label>
                    <Input className='col-span-3' defaultValue={contact.contactMobileNumber} {...register('contactMobileNumber')} />
                    <div className='col-span-3 col-start-2'>
                        {errors.contactMobileNumber && <span className='text-destructive'>{errors.contactMobileNumber.message}</span>}
                    </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-left'>
                        Address
                    </Label>
                    <Input className='col-span-3' defaultValue={contact.contactAddress} {...register('contactAddress')} />
                    <div className='col-span-3 col-start-2'>
                        {errors.contactAddress && <span className='text-destructive'>{errors.contactAddress.message}</span>}
                    </div>
                </div>
                <Input className='col-span-3 hidden' defaultValue={contact.contactStatus} {...register('contactStatus')} />
            </div>
        </form>
    );
};

export default EditContactForm;
