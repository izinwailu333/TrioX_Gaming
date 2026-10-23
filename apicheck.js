export default async function handler(req, res) {
    // CORS ကို ခွင့်ပြုရန်
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { userid, zoneid } = req.query;
    const ALUU_API_KEY = process.env.ALUU_API_KEY;

    // Aluu ၏ အမှန်တကယ် URL (သင့် Document မှ အတိအကျ ပြောင်းထည့်ရန်)
    const aluuUrl = `https://aluu.in/api/v1/mlbb?userid=${userid}&zoneid=${zoneid}`;

    try {
        const response = await fetch(aluuUrl, {
            method: 'GET',
            headers: {
                'x-api-key': ALUU_API_KEY
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from Aluu" });
    }
}