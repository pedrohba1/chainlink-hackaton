export default function mint(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({ name: 'John Doe' });
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
