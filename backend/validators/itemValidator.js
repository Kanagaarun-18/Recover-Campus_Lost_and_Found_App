export const validateItem = (req, res, next) => {
  const { type, description, status, lost_or_found } = req.body;

  if (!type || !description || !status || !lost_or_found) {
    return res.status(400).json({
      message: "Missing required item fields"
    });
  }

  const allowedStatus = ["Lost", "Found", "Recovered"];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value"
    });
  }

  const allowedLostFound = ["lost", "found"];
  if (!allowedLostFound.includes(lost_or_found)) {
    return res.status(400).json({
      message: "Invalid lost_or_found value"
    });
  }

  next();
};
