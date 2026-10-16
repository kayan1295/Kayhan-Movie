import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [focused, setFocused] = useState("");

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setSuccess("");
    setFocused("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === "signup") {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Please enter your full name.";
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = "Name must be at least 2 characters.";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password.";
    } else if (mode === "signup" && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (mode === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must accept the terms.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        score: 0,
        text: "",
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = {
      1: "Very Weak",
      2: "Weak",
      3: "Medium",
      4: "Strong",
      5: "Very Strong",
    };

    return {
      score,
      text: labels[score] || "",
    };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    const isValid = validateForm();

    if (!isValid) return;

    setIsLoading(true);

    // Fake API request
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsLoading(false);

    if (mode === "login") {
      setSuccess("Login successful! Welcome back.");

      // Give the success animation a moment
      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } else {
      setSuccess("Account created successfully! Welcome to MOVIEX.");

      // After signup, switch to login
      setTimeout(() => {
        switchMode("login");

        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        }));
      }, 1800);
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setErrors({
        email: "Enter your email first.",
      });

      return;
    }

    setSuccess(
      "If an account exists with this email, a password reset link will be sent.",
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[140px]" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-900/20 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/5 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated rings */}
      <div className="pointer-events-none absolute left-[-180px] top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-red-500/10 lg:block" />

      <div className="pointer-events-none absolute right-[-200px] top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-red-500/10 lg:block" />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-600/50">
            <i className="bi bi-play-fill text-2xl" />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-[0.25em]">MOVIEX</h1>

            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500">
              Watch Beyond Limits
            </p>
          </div>
        </Link>

        <Link
          to="/"
          className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
        >
          <i className="bi bi-arrow-left transition-transform duration-300 group-hover:-translate-x-1" />
          Back Home
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center px-4 pb-12 pt-4">
        <div className="w-full max-w-[470px]">
          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              {mode === "login" ? "Welcome Back" : "Join MOVIEX"}
            </div>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              {mode === "login" ? (
                <>
                  Welcome <span className="text-red-500">Back.</span>
                </>
              ) : (
                <>
                  Create Your <span className="text-red-500">Account.</span>
                </>
              )}
            </h2>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-500">
              {mode === "login"
                ? "Sign in to continue watching your favorite movies and series."
                : "Create your MOVIEX account and unlock your cinematic world."}
            </p>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090909]/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8">
            {/* Top glow */}
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_25px_rgba(239,68,68,0.8)]" />

            {/* Card glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-600/10 blur-[70px]" />

            {/* Mode switch */}
            <div className="relative mb-7 flex rounded-2xl border border-white/5 bg-black/50 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`relative z-10 flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
                  mode === "login"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`relative z-10 flex-1 rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                <span className="text-lg font-bold">G</span>
                Google
              </button>

              <button
                type="button"
                className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                <i className="bi bi-apple text-lg" />
                Apple
              </button>
            </div>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                or continue with email
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              {mode === "signup" && (
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Full Name
                  </label>

                  <div
                    className={`group relative rounded-xl border bg-white/[0.03] transition-all duration-300 ${
                      focused === "fullName"
                        ? "border-red-500/60 bg-red-500/[0.03] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                        : "border-white/10"
                    }`}
                  >
                    <i
                      className={`bi bi-person absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        focused === "fullName"
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocused("fullName")}
                      onBlur={() => setFocused("")}
                      placeholder="John Doe"
                      className="w-full bg-transparent py-4 pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-700"
                    />
                  </div>

                  {errors.fullName && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <i className="bi bi-exclamation-circle" />
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email Address
                </label>

                <div
                  className={`group relative rounded-xl border bg-white/[0.03] transition-all duration-300 ${
                    focused === "email"
                      ? "border-red-500/60 bg-red-500/[0.03] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                      : "border-white/10"
                  }`}
                >
                  <i
                    className={`bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      focused === "email" ? "text-red-500" : "text-gray-600"
                    }`}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-4 pl-12 pr-4 text-sm text-white outline-none placeholder:text-gray-700"
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                    <i className="bi bi-exclamation-circle" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Password
                  </label>

                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs font-semibold text-red-500 transition-colors hover:text-red-400"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div
                  className={`group relative rounded-xl border bg-white/[0.03] transition-all duration-300 ${
                    focused === "password"
                      ? "border-red-500/60 bg-red-500/[0.03] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                      : "border-white/10"
                  }`}
                >
                  <i
                    className={`bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                      focused === "password" ? "text-red-500" : "text-gray-600"
                    }`}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    placeholder="••••••••"
                    className="w-full bg-transparent py-4 pl-12 pr-12 text-sm text-white outline-none placeholder:text-gray-700"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-white"
                  >
                    <i
                      className={`bi ${
                        showPassword ? "bi-eye-slash" : "bi-eye"
                      }`}
                    />
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                    <i className="bi bi-exclamation-circle" />
                    {errors.password}
                  </p>
                )}

                {/* Password strength */}
                {mode === "signup" && formData.password && (
                  <div className="mt-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-gray-600">
                        Password strength
                      </span>

                      <span className="text-[10px] font-bold text-gray-400">
                        {passwordStrength.text}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            item <= passwordStrength.score
                              ? "bg-red-500"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              {mode === "signup" && (
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Confirm Password
                  </label>

                  <div
                    className={`group relative rounded-xl border bg-white/[0.03] transition-all duration-300 ${
                      focused === "confirmPassword"
                        ? "border-red-500/60 bg-red-500/[0.03] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                        : "border-white/10"
                    }`}
                  >
                    <i
                      className={`bi bi-shield-lock absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                        focused === "confirmPassword"
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocused("confirmPassword")}
                      onBlur={() => setFocused("")}
                      placeholder="••••••••"
                      className="w-full bg-transparent py-4 pl-12 pr-12 text-sm text-white outline-none placeholder:text-gray-700"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-white"
                    >
                      <i
                        className={`bi ${
                          showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      />
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <i className="bi bi-exclamation-circle" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Remember */}
              {mode === "login" && (
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="peer sr-only"
                  />

                  <span className="flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] transition-all peer-checked:border-red-500 peer-checked:bg-red-600">
                    <i className="bi bi-check text-xs opacity-0 transition-opacity peer-checked:opacity-100" />
                  </span>

                  <span className="text-xs text-gray-500 transition-colors group-hover:text-gray-300">
                    Remember me
                  </span>
                </label>
              )}

              {/* Terms */}
              {mode === "signup" && (
                <div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="peer sr-only"
                    />

                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] transition-all peer-checked:border-red-500 peer-checked:bg-red-600">
                      <i className="bi bi-check text-xs text-white opacity-0 peer-checked:opacity-100" />
                    </span>

                    <span className="text-xs leading-5 text-gray-500">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-red-500 hover:text-red-400"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-red-500 hover:text-red-400"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {errors.agreeToTerms && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <i className="bi bi-exclamation-circle" />
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
                  <i className="bi bi-check-circle-fill mt-0.5" />

                  <span>{success}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-xl bg-red-600 py-4 font-bold text-white shadow-xl shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-600/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {/* Shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <i className="bi bi-arrow-repeat animate-spin text-lg" />
                      {mode === "login"
                        ? "Signing you in..."
                        : "Creating account..."}
                    </>
                  ) : (
                    <>
                      {mode === "login" ? "Sign In" : "Create Account"}

                      <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Bottom switch */}
            <div className="mt-7 text-center">
              <p className="text-sm text-gray-600">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() =>
                    switchMode(mode === "login" ? "signup" : "login")
                  }
                  className="font-semibold text-red-500 transition-colors hover:text-red-400"
                >
                  {mode === "login" ? "Create account" : "Sign in"}
                </button>
              </p>
            </div>

            {/* Security */}
            <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/5 pt-5 text-[10px] uppercase tracking-[0.15em] text-gray-700">
              <i className="bi bi-shield-check text-green-500/70" />
              Secure connection
              <span className="h-1 w-1 rounded-full bg-gray-700" />
              Your data is protected
            </div>
          </div>

          {/* Footer text */}
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-gray-700">
            © {new Date().getFullYear()} MOVIEX. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
