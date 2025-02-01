'use client';

import { Contact } from '@/models/Contact';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import ModalDialog from '../custom/ModalDialog';
import { ArrowUpDown } from 'lucide-react';
import EditContactForm from './edit-contact-form';
import { useIsLoadingStore } from '@/stores/IsLoadingStore';
import DeleteContactForm from './delete-contact-form';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//     id: string;
//     amount: number;
//     status: 'pending' | 'processing' | 'success' | 'failed';
//     email: string;
// };

export const contactColumns: ColumnDef<Contact>[] = [
    {
        id: 'select',
        header: ({ table }) => {
            // console.log('Header Checkbox', table);
            return (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Select all'
                />
            );
        },
        cell: ({ row }) => {
            // console.log('Row Checkbox', row);
            return <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'Name', // This should match with the interface or type of the data
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: ({ row }) => `${row.original.contactFirstName} ${row.original.contactLastName}`, // This is how you can access the data even if the accessorKey is different from the interface or type
    },
    // {
    //     accessorKey: 'contactLastName', // This should match with the interface or type of the data
    //     header: 'Last Name',
    //     // cell: ({ row }) => row.original.contactLastName, // This is how you can access the data even if the accessorKey is different from the interface or type
    // },
    {
        accessorKey: 'contactEmail', // This should match with the interface or type of the data
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        // cell: ({ row }) => row.original.contactEmail, // This is how you can access the data even if the accessorKey is different from the interface or type
    },
    {
        accessorKey: 'contactMobileNumber', // This should match with the interface or type of the data
        header: 'Mobile Number',
        // cell: ({ row }) => row.original.contactMobileNumber, // This is how you can access the data even if the accessorKey is different from the interface or type
    },
    {
        accessorKey: 'contactAddress', // This should match with the interface or type of the data
        header: 'Address',
        // cell: ({ row }) => row.original.contactAddress, // This is how you can access the data even if the accessorKey is different from the interface or type
    },
    {
        accessorKey: 'contactStatus', // This should match with the interface or type of the data
        header: 'Status',
        // cell: ({ row }) => row.original.contactStatus, // This is how you can access the data even if the accessorKey is different from the interface or type
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const contact = row.original;
            const isLoading = useIsLoadingStore((state) => state.isLoading);
            // console.log('payment');
            // console.log(contact);

            return (
                // <DropdownMenu>
                //     <DropdownMenuTrigger asChild>
                //         <Button variant='ghost' className='h-8 w-8 p-0'>
                //             <span className='sr-only'>Open menu</span>
                //             <MoreHorizontal className='h-4 w-4' />
                //         </Button>
                //     </DropdownMenuTrigger>
                //     <DropdownMenuContent align='end'>
                //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                //         <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
                //         <DropdownMenuSeparator />
                //         <DropdownMenuItem>View customer</DropdownMenuItem>
                //         <DropdownMenuItem>View payment details</DropdownMenuItem>
                //     </DropdownMenuContent>
                // </DropdownMenu>
                <div className='flex items-center justify-end gap-2'>
                    <ModalDialog
                        trigger={
                            <Button variant='outline' size={'sm'}>
                                Edit
                            </Button>
                        }
                        title='Edit Contact'
                        description={`Make changes to your profile here. Click save when you're done.`}
                        body={<EditContactForm contact={contact} />}
                        footer={
                            <Button type='submit' form='contactFormUpdate' disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        }
                    />
                    <ModalDialog
                        trigger={
                            <Button variant='outline' size={'sm'} className='text-destructive'>
                                Delete
                            </Button>
                        }
                        title='Delete Contact'
                        description={`Are you sure you want to delete this contact? This action cannot be undone.`}
                        footer={<DeleteContactForm contactId={contact.contactId} />}
                    />
                </div>
            );
        },
    },
];
