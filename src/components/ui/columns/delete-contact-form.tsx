import { useToast } from '@/hooks/use-toast';
import { deleteContact } from '@/services/api';
import { useIsLoadingStore } from '@/stores/IsLoadingStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

interface DeleteContactFormProps {
    contactId: number;
}
const DeleteContactForm = ({ contactId }: DeleteContactFormProps) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { setIsLoading } = useIsLoadingStore();
    const mutation = useMutation({
        mutationFn: (contactId: number) => deleteContact(contactId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast({
                title: '✅ Contact deleted successfully! 🚀',
                description: 'You have successfully deleted the contact.',
            });
        },
        onError: (error) => {
            toast({
                title: '❌ Error deleting contact',
                description: error.message || 'An error occurred while deleting the contact.',
            });
        },
        onSettled: (data, error, variables, context) => {
            console.log('settled', data, error, variables, context);
            setIsLoading(false);
        },
    });

    const onSubmitContact = async () => {
        setIsLoading(true);
        mutation.mutate(contactId);
    };

    return (
        <Button type='button' variant='destructive' disabled={mutation.isPending} onClick={onSubmitContact}>
            {mutation.isPending ? 'Deleting...' : 'Delete'}
        </Button>
    );
};

export default DeleteContactForm;
