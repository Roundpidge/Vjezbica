const prehistorij=[
  {id:1, naziv: "Cotylorhynchus", cijena: 5000},
  {id:2, naziv: "Gallimimus", cijena:10000},
  {id:3, naziv:"Udanoceratops", cijena: 2500}
];


 const naruceno=[];


const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/kupi", (req, res)=>{
  const narudzba=req.body;
  const kljucevi=Object.keys(narudzba);

  if(!(kljucevi.includes('bice') && kljucevi.includes('cijena'))){
    res.send("Niste poslali sve potrebne podatke")
    return;
  }
  
  const id_bice=req.params.id

  for(bice of prehistorij){
    if(bice.id==id_bice){
    naruceno.push(narudzba);

      }else if(isNaN(bice)){
      res.json({message: "Upisali ste krivi parametar"})
      break;

        }else{
        res.json({message: "Bice s trazenim id-om  ne postoji na listi"})
        break;
        }
  }
  console.log("Primljeni podaci: ", narudzba)
res.send(`Narudzba uspjesno poslana za ${narudzba.naziv}, cijene ${narudzba.cijena}!` );
})

app.get('/', (req, res) => {
  const lijepiIspis = JSON.stringify(naruceno, null, 2);

  res.send(` <h1>Hello, world!</h1>
    <p>I love Cotylorhynchus</p> 
    <pre> naruceno:
        ${lijepiIspis}</pre>`);
});

app.get("/prehistorij",(req, res)=>{
  res.json(prehistorij);
})

app.get("/prehistorij/:id",(req, res)=>{
const id_bice=req.params.id

for(bice of prehistorij){
  if(bice.id==id_bice){
    res.json(bice);
  }else if(isNaN(bice)){
    res.json({message: "Upisali ste krivi parametar"})
    break;
  }else{
    res.json({message: "Bice s trazenim id-om  ne postoji na listi"})
    break;
  }
}
})

app.listen(PORT, error => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});
