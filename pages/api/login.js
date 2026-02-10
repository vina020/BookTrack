export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    // Simulasi login sukses
    res.status(200).json({ 
      token: 'dummy-token-12345',
      user: { 
        email: email,
        name: 'Vina' 
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}