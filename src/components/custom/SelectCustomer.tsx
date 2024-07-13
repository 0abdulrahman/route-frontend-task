import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomerType } from "@/types/data";

type SelectCustomerProps = {
  setSelectedOption: (option: CustomerType) => void;
  customers: CustomerType[];
  selectedOption?: CustomerType;
};

export function SelectCustomer({ customers, selectedOption, setSelectedOption }: SelectCustomerProps) {
  return (
    <Select onValueChange={(value) => setSelectedOption(customers.find((c) => `${c.id}` === value)!)} value={`${selectedOption?.id}`}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Select a customer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Customers</SelectLabel>
          {customers?.map((c) => (
            <SelectItem key={c.id} value={`${c.id}`} className="cursor-pointer">
              {c.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
