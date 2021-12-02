import { useEffect, useState } from "react";
import { Assento } from "./@types";
import { Header } from "./components/Header";

function App() {
  const keyAssentos = '@Reserva:assentos';

  const [assentos, setAssentos] = useState<Assento[]>([] as Assento[]);

  useEffect(() => {
    //Carrega assentos da localStorage, se não existir, adiciona 
    let storageAssentos = JSON.parse(localStorage.getItem(keyAssentos) || '[]');

    if (!storageAssentos || storageAssentos.length === 0) {
      storageAssentos = Array<Assento>();

      for (let i = 1; i <= 32; i++) {
        storageAssentos.push(
          {nro: i, reservado: false}
        )
      }
      
      //Grava os assentos na localStorage 
      localStorage.setItem(keyAssentos, JSON.stringify(storageAssentos));
    }

    setAssentos(storageAssentos);
  }, []);

  return (
    <div>
      <Header />

      <main>
        
        <div className="onibus">
          {assentos && assentos.sort((a, b) => (a.nro > b.nro ? 1 : -1)).map(assento => {
            return(
              
            )}
          )}
        </div>
        
      </main>
    </div>
  );
}

export default App;
