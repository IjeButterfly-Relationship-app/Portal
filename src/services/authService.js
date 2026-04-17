import { loginAdmin } from "../api/authService"; // or wherever it's located

const handleSignIn = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const data = await loginAdmin(email, password);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("admin_email", data.admin.email);
    localStorage.setItem("admin_role", data.admin.role);
    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};
