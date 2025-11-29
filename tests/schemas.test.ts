import { loginSchema, registerSchema, PasswordSchema } from "../schemas/auth"

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(message)
}

// registerSchema confirmPassword refinement
{
  const ok = registerSchema.safeParse({
    name: "John Doe",
    email: "john@example.com",
    password: "StrongPass1!",
    confirmPassword: "StrongPass1!",
  })
  expect(ok.success === true, "registerSchema should accept matching passwords")

  const bad = registerSchema.safeParse({
    name: "John Doe",
    email: "john@example.com",
    password: "StrongPass1!",
    confirmPassword: "Mismatch1!",
  })
  expect(bad.success === false, "registerSchema should reject mismatched passwords")
}

// PasswordSchema refinement
{
  const ok = PasswordSchema.safeParse({
    currentPassword: "OldPass1!",
    newPassword: "NewPass1!",
    confirmPassword: "NewPass1!",
  })
  expect(ok.success === true, "PasswordSchema should accept matching new/confirm")

  const bad = PasswordSchema.safeParse({
    currentPassword: "OldPass1!",
    newPassword: "NewPass1!",
    confirmPassword: "OtherPass1!",
  })
  expect(bad.success === false, "PasswordSchema should reject mismatched new/confirm")
}

// loginSchema minimal
{
  const ok = loginSchema.safeParse({ email: "john@example.com", password: "x" })
  expect(ok.success === true, "loginSchema should accept email & password")
}

console.log("schemas.test: OK")