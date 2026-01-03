import supabase from "../config/supabaseClient.js";

// GET /api/admin/items/pending
// Fetch items pending admin verification
export const getPendingItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ message: error.message });
    res.json({ items: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/items/:id/verify
// Admin verifies an item (changes status from pending → lost/found)
export const verifyItem = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // should be "lost" or "found"

  if (!status || !["lost", "found"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const { data, error } = await supabase
      .from("items")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ message: error.message });
    res.json({ item: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/analytics
// Return basic analytics: total lost/found, most active users
export const getAnalytics = async (req, res) => {
  try {
    const { data: lostItems } = await supabase
      .from("items")
      .select("*", { count: "exact" })
      .eq("status", "lost");

    const { data: foundItems } = await supabase
      .from("items")
      .select("*", { count: "exact" })
      .eq("status", "found");

    const { data: users } = await supabase
      .from("users")
      .select("id, email, role");

    res.json({
      totalLost: lostItems.length,
      totalFound: foundItems.length,
      totalUsers: users.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
