import React, { useEffect } from 'react'
import Graph from './Graph';
import { auth, db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Stats = (
  {wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
  resetTest,
}
) => {
    // we are here avoiding the redendent data of graph we use Set() fn this is in build class and store the data in it 
    // in form of timeSet and make newGraph variable then filter the 1st data and doest not take repeat data and aviod
    //  reredering we use props to get the value from graph.js 
    
    let timeSet = new Set();
    const newGraph = graphData.filter((i) => {
        if(!timeSet.has(i[0])) {
            timeSet.add(i[0]);
            return i;
        }
    })

    const pushDataToDB = () => {

        if(isNaN(accuracy)){
            toast.error('Invalid test', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "Dark",
                });
                return
           }

      const resultRef = db.collection("Result");
      const { uid } = auth.currentUser;
      resultRef.add({
          wpm: wpm,
          accuracy: accuracy,
          timeStamp: new Date(),
          Characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
          userId: uid
        })
        .then((res) => {
          toast.success("User successfully stored in DataBase", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }).catch((err)=>{
            toast.error('User is Unable to store in Database', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    };

    useEffect(()=>{
        if(auth.currentUser){
            pushDataToDB();
        }else{
            toast.warning('User login needed to save result', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    },[])

  return (
    <>
      <div className="stats-box">
        <div className="left-stats">
          <div className="title">WPM</div>
          <div className="subtitle">{wpm}</div>
          <div className="title">Accuracy</div>
          <div className="subtitle">{accuracy}</div>
          <div className="title">Characters</div>
          <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
          <div onClick={resetTest} className='restart'>Restart</div> 
        </div>
        <div className="right-stats">{/* graph is here */}
              <Graph graphData={newGraph}/>
        </div>
      </div>
      
    </>
  );
};

export default Stats;