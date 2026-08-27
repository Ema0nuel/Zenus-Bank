export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  firstname: string | null;
  lastname: string | null;
  username: string | null;
};

export type Account = {
  id: string;
  user_id: string;
  account_type: string | null;
  account_number: string | null;
  balance: number | null;
  interest_rate: number | null;
  is_active: boolean | null;
  mortgage: number | null;
  loan: number | null;
  created_at?: string | null;
};

export type Transaction = {
  id: string;
  account_id: string;
  type: string | null;
  description: string | null;
  amount: number | null;
  balance_after: number | null;
  status: string | null;
  created_at: string;
};
