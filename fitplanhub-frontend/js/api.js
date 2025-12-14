const BASE_URL = "http://localhost:5000";

export async function signup(userData) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return res.json();
}

export async function login(userData) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return res.json();
}

export async function getPlans(token) {
  const res = await fetch(`${BASE_URL}/plans/ALL`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function getPlanDetails(planId, token) {
  const res = await fetch(`${BASE_URL}/plans/${planId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function subscribePlan(planId, token) {
  const res = await fetch(`${BASE_URL}/subscriptions/subscribe/${planId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
