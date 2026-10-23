"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [summaryError, setSummaryError] = useState("");

  function validate(emailValue: string, passwordValue: string) {
    const nextErrors = { email: "", password: "" };
    const normalizedEmail = emailValue.trim();
    if (!normalizedEmail) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@gmail\.com$/i.test(normalizedEmail)) {
      nextErrors.email = "Please use an email address ending in @gmail.com.";
    }
    if (!passwordValue) {
      nextErrors.password = "Password is required.";
    } else if (passwordValue.length <= 6) {
      nextErrors.password = "Your password needs more than 6 characters.";
    }
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(email, password);
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      setSummaryError("Please check the email and password rules above to float into Cinnamoroll Land.");
      return;
    }
    setSummaryError("");
    window.sessionStorage.setItem("little-notes-user", email.trim());
    router.push("/notes");
  }

  function fillDemo() {
    setEmail("cinnamoroll@gmail.com");
    setPassword("cloudy123");
    setErrors({ email: "", password: "" });
    setSummaryError("");
  }

  return (
    <main className="sky-page login-sky">
      <div className="sky-decor" aria-hidden="true">
        <span className="sky-glow glow-one" />
        <span className="sky-glow glow-two" />
        <span className="sky-glow glow-three" />
        <span className="floating-cloud cloud-one">☁</span>
        <span className="floating-cloud cloud-two">☁</span>
        <span className="floating-cloud cloud-three">☁</span>
        <span className="floating-star star-one">✦</span>
        <span className="floating-star star-two">✧</span>
      </div>
      <section className="login-card-wrap">
        <header className="mascot-header">
          <div className="mascot-badge" aria-hidden="true">
            <svg viewBox="0 0 100 80" className="mascot-svg">
              <ellipse cx="12" cy="40" rx="12" ry="22" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" transform="rotate(-20 12 40)" />
              <ellipse cx="88" cy="40" rx="12" ry="22" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" transform="rotate(20 88 40)" />
              <ellipse cx="50" cy="45" rx="32" ry="26" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
              <circle cx="38" cy="42" r="3.5" fill="#0284C7" />
              <circle cx="62" cy="42" r="3.5" fill="#0284C7" />
              <ellipse cx="30" cy="48" rx="4" ry="2.5" fill="#F472B6" opacity=".6" />
              <ellipse cx="70" cy="48" rx="4" ry="2.5" fill="#F472B6" opacity=".6" />
              <path d="M 46 48 Q 50 52 54 48" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1>Cinnamoroll Notes <span aria-hidden="true">✨</span></h1>
          <p>Welcome to your fluffy sky-blue notebook ☁️</p>
        </header>

        <form className="sky-login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="email"><span aria-hidden="true">✉</span> Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="cinnamoroll@gmail.com"
              value={email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
                if (errors.email) setErrors((current) => ({ ...current, email: "" }));
                setSummaryError("");
              }}
            />
            {errors.email && <p className="sky-field-error" id="email-error">♡ {errors.email}</p>}
          </div>
          <div className="login-field">
            <label htmlFor="password"><span aria-hidden="true">♙</span> Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="At least 7 characters"
              value={password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              onChange={(event) => {
                const value = event.target.value;
                setPassword(value);
                if (errors.password) setErrors((current) => ({ ...current, password: "" }));
                setSummaryError("");
              }}
            />
            {errors.password && <p className="sky-field-error" id="password-error">♡ {errors.password}</p>}
          </div>

          <aside className="validation-hint">
            <strong><span aria-hidden="true">☁</span> Form validation criteria</strong>
            <ul>
              <li>Email ends with <b>@gmail.com</b></li>
              <li>Password length is more than 6 characters</li>
            </ul>
          </aside>

          <button className="sky-submit" type="submit"><span aria-hidden="true">↗</span> Float to dashboard</button>
          {summaryError && <p className="sky-summary-error" role="alert"><span aria-hidden="true">♡</span>{summaryError}</p>}
        </form>

        <button className="demo-fill-button" type="button" onClick={fillDemo}>✨ Click to auto-fill valid credentials</button>
      </section>
    </main>
  );
}
