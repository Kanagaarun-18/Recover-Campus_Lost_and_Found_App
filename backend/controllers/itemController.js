import supabase from "../config/supabaseClient.js";

// GET /api/items
export const getItems = async (req, res) => {
  try {
    const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json({ items: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/items
export const postItem = async (req, res) => {
  const { name, description, status, location, posted_by } = req.body;

  if (!name || !description || !status || !posted_by) {
    return res.status(400).json({ message: "Name, description, status, and posted_by are required" });
  }

  try {
    const { data, error } = await supabase
      .from("items")
      .insert([{ name, description, status, location, posted_by }])
      .select()
      .single();

    if (error) return res.status(500).json({ message: error.message });
    res.status(201).json({ item: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/items/:id  (update status, e.g., recovered)
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "Status is required" });

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

// DELETE /api/items/:id
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) return res.status(500).json({ message: error.message });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
