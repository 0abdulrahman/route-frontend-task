import { useEffect, useState } from "react";
import "./App.css";
import TransactionsTable from "./components/custom/TransactionsTable";
import { CustomerType, TransactionType } from "./types/data";
import { Input } from "./components/ui/input";
import { TransactionsChart } from "./components/custom/TransactionsChart";

type DataType = {
  customers: { id: number; name: string }[];
  transactions: { id: number; customer_id: number; date: string; amount: number }[];
};

function App() {
  const [transactions, setTransactions] = useState<TransactionType[] | null>(null);
  const [customers, setCustomers] = useState<CustomerType[] | null>(null);

  const [filteredData, setFilteredData] = useState<TransactionType[] | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/data/data.json");
        const responseData: DataType = await response.json();

        const transaction = responseData.transactions.map((t: { id: number; customer_id: number; date: string; amount: number }) => ({
          id: t.id,
          customer_id: t.customer_id,
          customer: responseData.customers.find((c: { id: number; name: string }) => c.id === t.customer_id)!.name,
          date: new Date(t.date),
          amount: t.amount,
        }));

        setTransactions(transaction);
        setCustomers(responseData.customers);
      } catch (error) {
        console.error(error);
        setTransactions(null);
        setCustomers(null);
      }
    })();
  }, []);

  useEffect(() => {
    if (customerName) setFilteredData(transactions?.filter((t) => t.customer.toLowerCase().includes(customerName.toLowerCase())) || []);
    else setFilteredData(null);
  }, [customerName, transactions]);

  useEffect(() => {
    if (transactionAmount) setFilteredData(transactions?.filter((t) => t.amount === transactionAmount) || []);
    else setFilteredData(null);
  }, [transactionAmount, transactions]);

  return (
    <main className="container">
      <h1 className="text-center mt-8 text-xl md:text-4xl font-bold uppercase tracking-widest md:tracking-[10px] relative before:absolute before:top-full before:mt-2 before:w-1/3 before:h-[1px] before:left-1/2 before:-translate-x-1/2 before:bg-blue-400">
        Customers transactions
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
        <Input
          type="text"
          placeholder="Search by customer name..."
          value={customerName || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value) setCustomerName(value);
            else setCustomerName(null);
          }}
        />
        <Input
          type="text"
          placeholder="Search by transaction amoung..."
          value={transactionAmount || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value) setTransactionAmount(+value);
            else setTransactionAmount(null);
          }}
        />
      </div>

      <TransactionsTable transactions={filteredData || transactions} />

      <hr className="my-8" />

      <h1 className="text-center mt-16 mb-12 text-xl md:text-4xl font-bold uppercase tracking-widest md:tracking-[10px] relative before:absolute before:top-full before:mt-2 before:w-1/3 before:h-[1px] before:left-1/2 before:-translate-x-1/2 before:bg-blue-400">
        Transactions Graph
      </h1>

      <TransactionsChart transactionsData={transactions || []} customers={customers || []} />
    </main>
  );
}

export default App;
