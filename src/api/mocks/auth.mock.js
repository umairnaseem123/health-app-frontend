// Signed-up names are remembered locally (per browser) so login can greet
// a returning user by their real name. First-time logins with no matching
// signup fall back to deriving a display name from the email.

function deriveNameFromEmail(email) {
  const localPart = email.split("@")[0] || "there";
  const cleaned = localPart.replace(/[._\d]+/g, " ").trim();
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ") || "there";
}

export function mockSignup(email, fullName) {
  const registry = JSON.parse(localStorage.getItem("mock_users") || "{}");
  registry[email] = fullName;
  localStorage.setItem("mock_users", JSON.stringify(registry));
  return Promise.resolve({ user_id: 1, email });
}

export function mockLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error("Email and password are required."));
        return;
      }
      const registry = JSON.parse(localStorage.getItem("mock_users") || "{}");
      const full_name = registry[email] || deriveNameFromEmail(email);

      resolve({
        access: "mock-access-token",
        refresh: "mock-refresh-token",
        user: { id: 1, email, full_name },
      });
    }, 600); // fake network delay so loading states are visible
  });
}

export function mockGetMe() {
  const name = localStorage.getItem("user_name") || "there";
  return Promise.resolve({
    id: 1,
    email: "john@example.com",
    full_name: name,
    city: "Karachi",
  });
}
