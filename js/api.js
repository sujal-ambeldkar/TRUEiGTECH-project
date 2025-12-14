// src/frontend/js/api.js

// ✅ Get all plans (for users)
export async function getPlans(token) {
  try {
    const res = await fetch('http://localhost:5000/plans/all', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    if (!res.ok) throw new Error(`Failed to fetch plans: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("getPlans error:", err);
    throw err;
  }
}

// ✅ Create new plan (for trainers)
export async function createPlan(token, planData) {
  try {
    const res = await fetch('http://localhost:5000/plans/trainer/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(planData)
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.msg || 'Failed to create plan');
    }

    return await res.json();
  } catch (err) {
    console.error("createPlan error:", err);
    throw err;
  }
}

// ✅ Get trainer's own plans
export async function getTrainerPlans(token) {
  try {
    const res = await fetch('http://localhost:5000/plans/trainer', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.msg || 'Failed to fetch trainer plans');
    }

    return await res.json();
  } catch (err) {
    console.error("getTrainerPlans error:", err);
    throw err;
  }
}
