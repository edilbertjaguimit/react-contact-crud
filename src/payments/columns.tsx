'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ModalDialog from '@/components/ui/custom/ModalDialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};

export const columns: ColumnDef<Payment>[] = [
    // For the select column, we use the `id` property to uniquely identify the column. This is important for the `useReactTable` hook.
    // When we use the select row feature, we need to use stetemanagement to keep track of which rows are selected.
    // In that case, we need to store each row's id in the global state which is a Set to keep track of the selected rows and perform operations like select all to delete all selected rows.
    {
        id: 'select',
        header: ({ table }) => {
            console.log('Header Checkbox', table);
            return (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Select all'
                />
            );
        },
        cell: ({ row }) => {
            console.log('Row Checkbox', row);
            return <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'amount',
        header: () => <div className='text-right'>Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP',
            }).format(amount);

            return <div className='text-right font-medium'>{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original;
            console.log('payment');
            console.log(payment);
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
                        body={
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-right'>
                                        Name
                                    </Label>
                                    <Input id='name' value='Pedro Duarte' className='col-span-3' />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='username' className='text-right'>
                                        Username
                                    </Label>
                                    <Input id='username' value='@peduarte' className='col-span-3' />
                                </div>
                            </div>
                        }
                        footer={<Button type='submit'>Save changes</Button>}
                    />
                    <ModalDialog
                        trigger={
                            <Button variant='outline' size={'sm'} className='text-destructive'>
                                Delete
                            </Button>
                        }
                        title='Delete Contact'
                        description={`Are you sure you want to delete this contact? This action cannot be undone.`}
                        footer={
                            <Button type='submit' variant='destructive'>
                                Delete
                            </Button>
                        }
                    />
                </div>
            );
        },
    },
];
