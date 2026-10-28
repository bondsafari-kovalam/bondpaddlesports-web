import { redirect } from 'next/navigation'

// /investor goes to the dashboard, which sends signed-out visitors to the login page.
export default function InvestorIndex() {
  redirect('/investor/dashboard')
}
