import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const SubscriptionSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Subscribed successfully! You'll receive updates at ${values.email}`, {
      toastId: "subscribeEmail"
    })


    form.reset();
  }

  return (
    <div className="w-full py-20 bg-gradient-to-r from-custom-primary/10 to-custom-secondary/10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-custom-primary" />
              <span className="font-semibold text-custom-primary">Newsletter</span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest menu updates, special offers, and culinary events.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full md:w-auto space-y-4 flex-1"
            >
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          className="h-12 px-4 py-3 rounded-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="h-12 px-6 rounded-full bg-custom-primary hover:bg-custom-primary/90"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;