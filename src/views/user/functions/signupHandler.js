import { supabase } from '../../../utils/supabaseClient';
import { sendWelcomeEmail } from './Emailing/email';
import { getGeoLocation } from './data';

/**
 * Signup a new user, insert full profile, create accounts, and send welcome email.
 * @param {Object} formData - All signup form fields.
 * @param {string} ip - User's IP address.
 */
export async function signupUser(formData, ip) {
  // 1. Create user in Supabase Auth
  const {
    email,
    password,
    firstname,
    lastname,
    title,
    phone1, // Form field name
    selectcountry, // Form field name for phone country code
    country, // Form field name for nationality
    uaddress, // Form field name for address
    city,
    state,
    zip,
    dob,
    occupation,
    ssn,
    marital, // Form field name for marital status
    gender,
    acctype
  } = formData;

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);

  // Check if we have a valid user
  if (!data?.user?.id) {
    throw new Error('Failed to create user account');
  }

  const userId = data.user.id;

  // 2. Insert profile data with correct field mappings
  const profileData = {
    id: userId,
    full_name: `${firstname} ${lastname}`,
    title: title || null,
    firstname,
    lastname,
    phone: phone1 || null, // Map phone1 from form
    country_code: selectcountry || null, // Map selectcountry from form
    nationality: country || null, // Map country from form
    address: uaddress || null, // Map uaddress from form
    city: city || null,
    state: state || null,
    zip: zip || null,
    dob: dob || null,
    occupation: occupation || null,
    ssn: ssn || null,
    marital_status: marital || null, // Map marital from form
    gender: gender || null,
    email,
    username: `${firstname} ${lastname}` || null
  };

  const { error: profileError } = await supabase.from("profiles").insert(profileData);
  if (profileError) throw new Error(profileError.message);

  // 3. Create fiat account
  const account_number = "10" + Math.floor(1000000000 + Math.random() * 9000000000);
  const { data: accountData, error: accountError } = await supabase
    .from("accounts")
    .insert({
      user_id: userId,
      account_type: acctype,
      account_number,
      balance: 0,
      interest_rate: acctype === "USD SAVING" ? 2.5 : 4.0
    })
    .select()
    .single();

  if (accountError) throw new Error(accountError.message);

  // 4. Create crypto account with default zero balances
  const { error: cryptoError } = await supabase
    .from("crypto_balances")
    .insert({
      user_id: userId,
      account_id: accountData.id,
      btc_balance: 0,
      eth_balance: 0,
      usdt_balance: 0,
      usdc_balance: 0,
      bnb_balance: 0,
      sol_balance: 0
    });

  if (cryptoError) throw new Error(cryptoError.message);

  // 5. Send welcome email with both account details
  const geo = await getGeoLocation(ip);
  await sendWelcomeEmail({
    name: `${firstname} ${lastname}`,
    email,
    accountNumber: account_number,
    ip,
    geo,
    hasCryptoAccount: true // Add flag to indicate crypto account creation
  });

  // 6. Redirect to authentication view
  window.location.href = "/user/auth";
}