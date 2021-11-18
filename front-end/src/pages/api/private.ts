export default async function mint(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(req.body);

      // const isAuth = pinata.testAuthentication();
      // if (isAuth) {
      //   const result = pinata.pinJSONToIPFS(req.body);
      //   res.status(200).json(result);
      // } else {
      //   res.status(400).json({ message: 'pinata failed to auth' });
      // }
      res.status(200).json(req.body);
    } catch (e) {
      res.status(400).json(e);
    }
  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}
