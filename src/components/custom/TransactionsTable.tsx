import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionType } from "@/types/data";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TransactionsTable({ transactions }: { transactions: TransactionType[] | null }) {
  const [page, setPage] = useState(1);

  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "full", numberingSystem: "latn" });
  const priceFormatter = new Intl.NumberFormat("en-US", { numberingSystem: "latn" });

  const lastPage = transactions?.length ? Math.ceil(transactions.length / 7) : 0;

  return (
    <section className="flex flex-col justify-between gap-2 h-[500px]">
      <Table className="mt-4">
        <TableHeader>
          <TableRow className="rounded-md">
            <TableHead className="w-52">Customer</TableHead>
            <TableHead>Transaction date</TableHead>
            <TableHead className="text-end">Transaction amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.length ? (
            transactions.slice((page - 1) * 7, page * 7).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium text-blue-400">{transaction.customer}</TableCell>
                <TableCell>{dateFormatter.format(new Date(transaction.date))}</TableCell>
                <TableCell className="text-end text-green-400">${priceFormatter.format(transaction.amount)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center text-red-400" colSpan={3}>
                No data!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex gap-4 justify-center">
        <Button disabled={page === 1} size="icon" variant="secondary" className="rounded-md" onClick={() => setPage((prev) => prev - 1)}>
          <ChevronLeft />
        </Button>
        <Button
          disabled={page === lastPage || lastPage === 0}
          size="icon"
          variant="secondary"
          className="rounded-md"
          onClick={() => setPage((prev) => prev + 1)}>
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}
