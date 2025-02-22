import  uploadImage  from '../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body;
    try {
      const url = await uploadImage(image);
      res.status(200).json({ url });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}