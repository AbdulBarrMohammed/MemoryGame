import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'

function App() {
  const [clickedImages, setClickedImages] = useState([]);
  const [imgLst, setImgLst] = useState([]);
  const [score, setScore] = useState(-1);
  const [bestScore, setBestScore] = useState(0);
  const [currId, setCurrId] = useState(0);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dragonball-api.com/api/characters/');
        let data = await response.json();
        let dataWithoutLast = data.items.slice(0, -1); // Access items before slicing
        setImgLst(dataWithoutLast);

      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if(clickedImages.includes(currId)) {
      console.log('STARTNG OVER')
      if (score > bestScore) {
        setBestScore(score)
        setScore(0);
        setClickedImages([]);

      }
      else {
        setScore(0);
        setClickedImages([]);
      }

    }
    else {
      setClickedImages([...clickedImages, currId]);
      setScore(score + 1);
    }

  }, [tries])

  const swapImages = (e) => {
    e.preventDefault();
    setCurrId(e.target.id);
    setTries(tries + 1);

    const imgLstCopy = [...imgLst];
    imgLstCopy.map((item, index) => {
      let randomIndex = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
      let temp = imgLstCopy[index];
      imgLstCopy[index] = imgLstCopy[randomIndex];
      imgLstCopy[randomIndex] = temp;
    })
    setImgLst(imgLstCopy);
  };

  return (
    <>
    <Header score={score} bestScore={bestScore}/>
    <div class="content">
      <div class="cards">
          {imgLst.length > 0 ? (
            imgLst.map((item, index) => (
              <div onClick={swapImages} class="card" id= {imgLst[index].id} key={imgLst[index].id}>
                  <img id= {imgLst[index].id} key={imgLst[index].id} className="characters" src={imgLst[index].image} />
              </div>
          ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

      </div>
    </>
  )
}

export default App;
