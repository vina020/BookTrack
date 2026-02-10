export default function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, password } = req.body;
    
    // Simulasi register sukses
    res.status(200).json({ 
      message: 'Registrasi berhasil',
      user: {
        name: fullName,
        email: email
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}