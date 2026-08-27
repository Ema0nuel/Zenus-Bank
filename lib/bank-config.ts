/**
 * Central operational configuration for Zenus Bank.
 *
 * Single source of truth for values that used to be hardcoded across the
 * old views (admin email, limits, durations, card types, transfer types,
 * currencies, locales, etc.). Views must read from here instead of inlining
 * literals. Environment-backed values fall back to sensible defaults.
 */

export type Currency = {
  code: string;
  label: string;
  symbol: string;
};

export type LocaleOption = {
  code: string;
  label: string;
};

export type Option = {
  value: string;
  label: string;
};

export type TransferField = {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  step?: string;
  min?: number;
  options?: Option[];
};

export type TransferType = {
  key: "local" | "wire" | "interbank";
  label: string;
  description: string;
  otpType: string;
  fields: TransferField[];
};

export const bankConfig = {
  /** Support / admin contact email (client-accessible). */
  adminEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "zenusbanking@gmail.com",

  /** Optional external payment link for deposit requests (may be empty). */
  paymentLink: process.env.NEXT_PUBLIC_PAYMENT_LINK || "",

  accountTypes: ["USD SAVING", "MONEY MARKET"] as const,

  limits: {
    minDeposit: 200,
    minWithdrawal: 200,
    minLoan: 100,
  },

  loan: {
    durations: [
      { value: "3", label: "3 months" },
      { value: "6", label: "6 months" },
      { value: "12", label: "12 months" },
      { value: "24", label: "24 months" },
    ] as Option[],
    interest: { min: 6, max: 10 },
  },

  cardTypes: [
    { value: "visa", label: "Visa Debit" },
    { value: "mastercard", label: "Mastercard Credit" },
  ] as Option[],

  withdrawalAccountTypes: [
    { value: "local", label: "Local account" },
    { value: "foreign", label: "Foreign account" },
  ] as Option[],

  cardStatuses: ["pending", "approved", "issued", "declined"] as const,

  currencies: [
    { code: "USD", label: "US Dollar", symbol: "$" },
    { code: "EUR", label: "Euro", symbol: "€" },
    { code: "GBP", label: "British Pound", symbol: "£" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥" },
  ] as Currency[],

  locales: [
    { code: "en-US", label: "English (United States)" },
    { code: "en-GB", label: "English (United Kingdom)" },
    { code: "fr-FR", label: "Français (France)" },
    { code: "de-DE", label: "Deutsch (Deutschland)" },
  ] as LocaleOption[],

  idleTimeoutOptions: [
    { value: "0", label: "Never" },
    { value: "5", label: "5 minutes" },
    { value: "10", label: "10 minutes" },
    { value: "30", label: "30 minutes" },
  ] as Option[],

  transferTypes: [
    { key: "local", label: "Local Transfer", description: "Send money to an account at another local bank." },
    { key: "wire", label: "Wire Transfer", description: "Send money internationally by SWIFT." },
    { key: "interbank", label: "Interbank Transfer", description: "Transfer between accounts within the bank." },
  ],

  transferForms: {
    local: {
      key: "local",
      label: "Local Transfer",
      description: "Send money to an account at another local bank.",
      otpType: "local",
      fields: [
        { name: "amount", label: "Amount", type: "number", required: true, min: 1, step: "0.01", placeholder: "0.00" },
        { name: "bankname", label: "Bank Name", type: "text", required: true, placeholder: "Beneficiary bank name" },
        { name: "accountName", label: "Account Holder", type: "text", required: true, placeholder: "Beneficiary account name" },
        { name: "accountNum", label: "Account Number", type: "text", required: true, placeholder: "Beneficiary account number" },
        { name: "desc", label: "Description", type: "textarea", required: true, placeholder: "Payment reference / note" },
      ],
    },
    wire: {
      key: "wire",
      label: "Wire Transfer",
      description: "Send money internationally by SWIFT.",
      otpType: "wire",
      fields: [
        { name: "amount", label: "Amount", type: "number", required: true, min: 1, step: "0.01", placeholder: "0.00" },
        { name: "bankname", label: "Bank Name", type: "text", required: true, placeholder: "Beneficiary bank name" },
        { name: "country", label: "Country", type: "text", required: true, placeholder: "e.g. USA" },
        { name: "accountName", label: "Account Holder", type: "text", required: true, placeholder: "Beneficiary account name" },
        { name: "accountNum", label: "Account Number", type: "text", required: true, placeholder: "Beneficiary account number" },
        { name: "swiftcode", label: "SWIFT Code", type: "text", required: true, placeholder: "SWIFT / BIC" },
        { name: "desc", label: "Description", type: "textarea", required: true, placeholder: "Payment reference / note" },
      ],
    },
    interbank: {
      key: "interbank",
      label: "Interbank Transfer",
      description: "Transfer between accounts within the bank.",
      otpType: "interbank",
      fields: [
        { name: "amount", label: "Amount", type: "number", required: true, min: 1, step: "0.01", placeholder: "0.00" },
        { name: "accountName", label: "Account Holder", type: "text", required: true, placeholder: "Beneficiary account name" },
        { name: "accountNum", label: "Account Number", type: "text", required: true, placeholder: "Beneficiary account number" },
        { name: "desc", label: "Description", type: "textarea", required: true, placeholder: "Payment reference / note" },
      ],
    },
  } satisfies Record<TransferType["key"], TransferType>,

  notificationTypes: ["info", "success", "warning", "danger"] as const,

  notificationPreferences: [
    { key: "transfers", label: "Transfers", description: "Transfers, deposits, and withdrawals." },
    { key: "security", label: "Security", description: "Sign-in and security alerts." },
    { key: "account", label: "Account updates", description: "Account status and statement updates." },
    { key: "marketing", label: "Marketing", description: "Offers and product news." },
  ],
};
