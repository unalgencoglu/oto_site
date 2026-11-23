const express = require('express');
const app = express();
app.use(express.json());

const parcalar = [
    { id: 1, ad: 'Fren balatası', marka: 'Bosch', fiyat: 850 },
    { id: 2, ad: 'Yağ filtresi', marka: 'Mann', fiyat: 220 },
];

app.get('/', (req, res) => {
    res.json({ mesaj: 'çalışıyor'});
});

app.get('/parcalar', (req, res) => {
    res.json(parcalar);
});

app.get('/parcalar/:id', (req, res) => {
    const id = Number(req.params.id);

    const parca = parcalar.find(p => p.id === id);

    if(!parca) {
        return res.status(404).json({ mesaj: 'Parça bulunamadı'});
    }

    res.status(200).json(parca);
});

app.post('/parcalar', (req, res) => {
    const { ad, marka, fiyat } = req.body;

    if(!ad || !marka || !fiyat) {
        return res.status(400).json({ mesaj: 'gönderilen veri eksik ya da hatalı'});
    }

    const yeniParca = {
        id: parcalar.length + 1,
        ad: ad,
        marka: marka,
        fiyat: fiyat,
    };

    parcalar.push(yeniParca);

    res.status(201).json(yeniParca);
});

app.put('/parcalar/:id', (req, res) => {
    const id = Number(req.params.id);
    const parca = parcalar.find(p => p.id === id);

    if(!parca) {
        return res.status(404).json({ mesaj: 'id bulunamadı' });
    }

    const { ad, marka, fiyat } = req.body;

    if(!ad || !marka || !fiyat) {
        return res.status(400).json({ mesaj: 'veri hatalı veya eksik' });
    }

    parca.ad = ad;
    parca.marka = marka;
    parca.fiyat = fiyat;

    res.status(200).json(parca);
});

app.delete('/parcalar/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = parcalar.findIndex(p => p.id === id);

    if(index === -1) {
        return res.status(404).json({ mesaj: 'id bulunamadı' });
    }

    parcalar.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log("sunucu çalışıyor");
});