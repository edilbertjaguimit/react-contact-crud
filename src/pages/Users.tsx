import { contactColumns } from '@/components/ui/columns/contact-columns';
import { ContactDataTable } from '@/components/ui/columns/contact-data-table';
import { Contact } from '@/models/Contact';
import CustomTable from '@/payments/page';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const fetchContact = async (): Promise<Contact[]> => {
    const response = await api.get('contact');
    console.log('Response', response.data);
    return response.data;
};
const Users = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['contacts'],
        queryFn: fetchContact,
    });
    console.log(data);
    console.log(isLoading);
    console.log(isError);
    console.log(error);
    return (
        <div className='container mx-auto'>
            <h1 className='text-2xl'>Contacts</h1>
            {/* <CustomTable /> */}
            <ContactDataTable columns={contactColumns} data={data || []} />
        </div>
    );
};

export default Users;
