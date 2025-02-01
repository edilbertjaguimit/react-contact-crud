import { Button } from '@/components/ui/button';
import { contactColumns } from '@/components/ui/columns/contact-columns';
import { ContactDataTable } from '@/components/ui/columns/contact-data-table';
import ModalDialog from '@/components/ui/custom/ModalDialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { AddContactFormData, Contact, addContactSchema } from '@/models/Contact';
import { addContact, fetchContact } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';

const Users = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['contacts'],
        queryFn: fetchContact,
    });

    const mutation = useMutation({
        mutationFn: (newContact: AddContactFormData) => addContact(newContact as Contact), // Use your API function
        onSuccess: () => {
            // Invalidate the 'contacts' query to refetch data
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast({
                title: '✅ Contact added successfully! 🚀',
                description: 'You have successfully added a new contact.',
            });
        },
        onError: (error) => {
            toast({
                title: '❌ Error adding contact',
                description: error.message || 'An error occurred while deleting the contact.',
            });
        },
        onSettled: (data, error, variables, context) => {
            console.log('settled', data, error, variables, context);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // Reset the form after submission
    } = useForm<AddContactFormData>({
        resolver: zodResolver(addContactSchema),
    });

    const onSubmitContact = async (data: AddContactFormData) => {
        console.log('submit', data);
        mutation.mutate(data);
        reset();
    };

    return (
        <div className='container mx-auto'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl'>Contacts</h1>
                <ModalDialog
                    trigger={
                        <Button variant='outline' size={'sm'}>
                            <UserPlus />
                            Add Contact
                        </Button>
                    }
                    title='Add Contact'
                    description={`Add a new contact to your list. Fill in the details below and click save.`}
                    body={
                        <form id='contactForm' onSubmit={handleSubmit(onSubmitContact)}>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-left'>
                                        First Name
                                    </Label>
                                    <Input className='col-span-3' {...register('contactFirstName')} />
                                    <div className='col-span-3 col-start-2'>
                                        {errors.contactFirstName && <span className='text-destructive'>{errors.contactFirstName.message}</span>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-left'>
                                        Last Name
                                    </Label>
                                    <Input className='col-span-3' {...register('contactLastName')} />
                                    <div className='col-span-3 col-start-2'>
                                        {errors.contactLastName && <span className='text-destructive'>{errors.contactLastName.message}</span>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-left'>
                                        Email
                                    </Label>
                                    <Input className='col-span-3' {...register('contactEmail')} />
                                    <div className='col-span-3 col-start-2'>
                                        {errors.contactEmail && <span className='text-destructive'>{errors.contactEmail.message}</span>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-left'>
                                        Mobile Number
                                    </Label>
                                    <Input className='col-span-3' {...register('contactMobileNumber')} />
                                    <div className='col-span-3 col-start-2'>
                                        {errors.contactMobileNumber && <span className='text-destructive'>{errors.contactMobileNumber.message}</span>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-left'>
                                        Address
                                    </Label>
                                    <Input className='col-span-3' {...register('contactAddress')} />
                                    <div className='col-span-3 col-start-2'>
                                        {errors.contactAddress && <span className='text-destructive'>{errors.contactAddress.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                    footer={
                        <Button type='submit' form='contactForm' disabled={mutation.isPending}>
                            {mutation.isPending ? 'Saving...' : 'Save'}
                        </Button>
                    }
                />
            </div>
            {/* <CustomTable /> */}
            <ContactDataTable columns={contactColumns} data={data || []} />
            <Toaster />
        </div>
    );
};

export default Users;
