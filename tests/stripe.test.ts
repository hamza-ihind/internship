import { getStripe } from "../lib/stripe"

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(message)
}

// Guard: without key, getStripe should throw
{
  const prev = process.env.STRIPE_SECRET_KEY
  delete process.env.STRIPE_SECRET_KEY
  let threw = false
  try {
    getStripe()
  } catch (e) {
    threw = true
  }
  expect(threw, "getStripe should throw when STRIPE_SECRET_KEY is missing")
  process.env.STRIPE_SECRET_KEY = prev
}

// With a dummy key, should construct instance (not validated here)
{
  process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_dummy"
  const s = getStripe()
  expect(!!s, "getStripe should return a Stripe instance when key present")
}

console.log("stripe.test: OK")