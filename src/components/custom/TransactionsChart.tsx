"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { SelectCustomer } from "./SelectCustomer";
import { CustomerType, TransactionType } from "@/types/data";

type TransactionsChartProps = {
  transactionsData: TransactionType[];
  customers: CustomerType[];
};

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#facc15",
  },
} satisfies ChartConfig;

export function TransactionsChart({ transactionsData, customers }: TransactionsChartProps) {
  const [customer, setCustomer] = useState<CustomerType>(customers[0]);

  const dateFormatter = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" });
  useEffect(() => {
    setCustomer(customers[0]);
  }, [customers]);

  if (!customers?.length) return <p className="text-center text-red-400">No data!</p>;

  const chartData = transactionsData
    .filter((t) => t?.customer_id === customer?.id)
    .map((t) => ({ day: dateFormatter.format(new Date(t.date)), amount: t.amount }));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between flex-row gap-4">
        <CardTitle className="text-sm md:text-lg">
          Total transactions per day for <span className="text-yellow-400 font-semibold">{customer?.name}</span>
        </CardTitle>
        <SelectCustomer
          customers={customers}
          setSelectedOption={(option) => setCustomer(option)}
          selectedOption={{ id: customer?.id, name: customer?.name }}
        />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
            }}>
            <CartesianGrid vertical={true} />
            <XAxis dataKey="day" tickLine={true} axisLine={false} tickMargin={8} />
            <YAxis dataKey="amount" tickLine={true} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="amount" type="linear" strokeWidth={2} dot={true} stroke="#facc0f" strokeOpacity={0.25} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
