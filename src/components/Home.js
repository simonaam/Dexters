
import {useState, useEffect} from "react";
import {db,auth} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import './Home.css'

export const Home = () => {



        const [jela, setJela] = useState([]);
        const jelaDBRef = collection(db, 'food-menu-1')
      
      const[porudzbine, setPorudzbine] = useState([])

      const totalPrice = porudzbine.reduce(
        (total, porudzbina) => total + porudzbina.kolicina * porudzbina.cena, 0);
      
      const cenaPorudzbine = (porudzbina) => {
        return(porudzbina.kolicina * porudzbina.cena)
      }

        useEffect(() => {
          const getOrders = async () => {
            const data = await getDocs(jelaDBRef);
            console.log(data);
            setJela(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          };
          getOrders();
        }, [])
      
      

        const add = (izabrano_jelo) => {

          const postoji = porudzbine.find((x) => x.id == izabrano_jelo.id)
          if(postoji){
              setPorudzbine(
                  porudzbine.map((porudzbina) =>
                  porudzbina.id === izabrano_jelo.id  ? {...postoji, kolicina: postoji.kolicina + 1} : porudzbina
              )
             )  


          }else{
              setPorudzbine([...porudzbine,{ ...izabrano_jelo, kolicina : 1}])

          }

        }

        const remove = (izabrano) => {
                const postoji = porudzbine.find((x) => x.id === izabrano.id)
                if(postoji){
                  if(postoji.kolicina === 1){
                    setPorudzbine(porudzbine.filter((nadjeno) => nadjeno.id !== izabrano.id))
                  }else{
                    setPorudzbine(
                      porudzbine.map((porudzbina) =>
                      porudzbina.id === izabrano.id ?
                      { ...postoji, kolicina: postoji.kolicina - 1 } : porudzbina
                      )
                    )
                  }
                }

        }

      
        return (
          <div className="home">
          <div className="meni">
          <div className="App">
            {jela.map((jelo) => {
              return (
                <div className="foodCard">
                  <div className="cardInfo">
                  <h1 className="title">{jelo.ime}</h1>
                  <h4 className="description">{jelo.opis}</h4>
                  <h4 className="price">{jelo.cena}</h4>
                  <button onClick={() => add(jelo)} className="btnAdd"> Add to Cart</button>
                </div>
                <div className="cardImg">
                  <img src={jelo.img}></img>
                </div>
                </div>
              );
            })}
            <div>
            </div>
          </div>
          </div>
            <div className="korpa">
              <h3>Korpa</h3>
              { 

                  porudzbine.map((porudzbina) => {
                    return(
                      <div>
                          <h3> {porudzbina.ime}</h3>
                          <h3> {porudzbina.cena}</h3>
                          <button onClick={() => remove(porudzbina)}>-</button>
                          <h3> {porudzbina.kolicina}</h3>
                          <button onClick={() => add(porudzbina)}>+</button>
                          <h3>{porudzbina.kolicina * porudzbina.cena} RSD</h3>
                      </div>
                    )
                    }
                  )

                  

              }
              <h3> Total cena: {totalPrice} </h3>
              <h3> pdv : {totalPrice * 0.2} RSD</h3>
              <h3> dostava : {totalPrice > 2000 ? 0 : 300} RSD</h3>
              </div>

          </div>
          
        ); 
      
      
      

}