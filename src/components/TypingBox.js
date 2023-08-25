import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import Stats from './Stats';
import {generate} from 'random-words';
import UpperMenu from './UpperMenu';
import { useTestMode } from '../context/TestModeContext';


const TypingBox = () => {
const inputRef = useRef(null); //it create a reference to input text we made and hide it by default the input text
//  is selected.
const {testTime} = useTestMode();
const [countDown, setCountDown] = useState(testTime);
const [intervalId, setIntervalId] = useState(null);
const [testStart, setTestStart] = useState(false);
const [testEnd, setTestEnd] = useState(false);
const [correctChars, setCorrectChars] = useState(0);
const [incorrectChars, setIncorrectChars] = useState(0);
const [missedChars, setMissedChars] = useState(0);
const [extraChars, setExtraChars] = useState(0);
const [correctWords, setCorrectWords] = useState(0);

const [wordsArray, setWordsArray] = useState(()=> generate(50));
  //  console.log(inputRef);

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]);



   const wordsSpanRef = useMemo(()=>{
    return Array(wordsArray.length).fill(0).map(i=>createRef(null));
   },[wordsArray]);

  //  console.log(wordsSpanRef);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
  function timer (){
            setCountDown((LatestCountDown) => {
              setCorrectChars((correctChars)=> { 
//here we are doing calc of graph we have latest countdown with every sec our typing speed varies so it will account
// the wpm acc.  on x-axis we have time and on Y-axis we have the graph with wpm and accuracy. it is a bit heavy on ui
//whenevery we chnage state it get rerender it give some redendant data.
                setGraphData((graphData)=>{
                  return [...graphData, [testTime-LatestCountDown+1, 
                  (correctChars/5)/((testTime-LatestCountDown+1)/60)
                ]]
                })
                return correctChars;
              })

              if(LatestCountDown === 1){
                setTestEnd(true);
                clearInterval(intervalId);
                return 0;
              }
              return LatestCountDown - 1 ;
            });
      }
  }
  
  const resetTest = () => {
        clearInterval(intervalId);
        setCountDown(testTime);
        setCurrCharIndex(0);
        setCurrWordIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(generate(50));
        inputFocus();
        resetWordSpanRefClassName();
        setCorrectChars(0);
        setIncorrectChars(0);
        setMissedChars(0);
        setExtraChars(0);
        calculateWPM();
        calculateAcc();
        setCorrectWords(0);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
  }

  //to make reset cursor and hover effect.
  const resetWordSpanRefClassName = () => {
    // wordsSpanRef.forEach((i) => {
    //   Array.from(i.current.childNodes).map((j) => {
    //     j.className = "";
    //   });
    // });
    // wordsSpanRef[0].current.childNodes[0].className = "current";
    wordsSpanRef.forEach(i=>{
      if (i.current !== null) {
      Array.from(i.current.childNodes).map((j)=>{
        j.className=" ";
      });
      if(i.current.childNodes.length > 0)
      {
        wordsSpanRef[0].current.childNodes[0].className='current';
      }
    }
  })
 
  };


   const handleUserInput = (e)=>{
    // console.log(e)
    if(!testStart){ //this statement ensure that the user has started the test then only timer starts.
      startTimer();
      setTestStart(true);
    }


    // const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
    const allCurrChars= wordsSpanRef[currWordIndex].current?.childNodes;
    if (!allCurrChars) {
      return;
    }

    if(e.keyCode === 32){
      //logic for space
      
      let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
// this checks weather the correct words we type and the actual correct word i.e YOU - YoU
      if(correctCharsInWord.length === allCurrChars.length){
        setCorrectWords(correctWords+1);
      }
      
      if(allCurrChars.length<=currCharIndex){
        //remove cursor from lst place of word
        allCurrChars[currCharIndex-1].classList.remove('current-right');
      }else{
        //remove cursor in b/w the word
        setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
        allCurrChars[currCharIndex].classList.remove('current');

      }
      wordsSpanRef[currWordIndex+1].current.childNodes[0].className = 'current';
      setCurrWordIndex(currWordIndex+1);
      setCurrCharIndex(0);

      return;
    }
    
    //backspace
    if(e.keyCode===8)
    {
      if(currCharIndex!==0)
      {
        if(allCurrChars.length === currCharIndex)
        {
        if(allCurrChars[currCharIndex-1].className.includes('extra')){ 
 /* this is to handle the condition of appending extra words when 
        forget to press space and remove by back space */
            allCurrChars[currCharIndex-1].remove();
            allCurrChars[currCharIndex-2].className+=' current-right';
          }
          else{
            allCurrChars[currCharIndex-1].className='current';
          }
         
          setCurrCharIndex(currCharIndex-1)
          return;
        }
          allCurrChars[currCharIndex].className='';
          allCurrChars[currCharIndex-1].className='current';
          setCurrCharIndex(currCharIndex-1);
      }
      return;
    }
  //append extra word in case forget to press space button
        if(currCharIndex===allCurrChars.length)
  {
    let newSpan=document.createElement('span');
    newSpan.innerText=e.key;
    newSpan.className='incorrect extra current-right';
    allCurrChars[currCharIndex-1].classList.remove('current-right')
    wordsSpanRef[currWordIndex].current.append(newSpan);
    setCurrCharIndex(currCharIndex+1);
    setExtraChars(extraChars+1);
    return;
  }
    
    if(e.key === allCurrChars[currCharIndex].innerText){
      // console.log("correct", '48 wali line mai ? lagaya hai') 
      allCurrChars[currCharIndex].className = 'correct';
      setCorrectChars(correctChars+1);
    }else{
      allCurrChars[currCharIndex].className = 'incorrect';
      setIncorrectChars(incorrectChars + 1);
      // console.log("not correct")
    }
//switching left to right cursor
    if(currCharIndex+1 === allCurrChars.length ){
      allCurrChars[currCharIndex].className += ' current-right';
    }else{
      allCurrChars[currCharIndex+1].className = 'current';

    }

    setCurrCharIndex(currCharIndex+1);
    // console.log(allCurrChars[0].innerText)
  }

  const inputFocus = ()=> {
   inputRef.current.focus(); //resolve doubt focus is inbuilt fn that used to focus on text area by default
  }

  const calculateWPM = ()=> {
    return Math.round((correctChars/5)/(testTime/60));
  }

  const calculateAcc = () => {
    return Math.round((correctWords/currWordIndex)*100);
  }

   
   
   //when ever test time chnges the value of countdown chnges
   useEffect( () => {
    // setCountDown(testTime);
    resetTest();
   }, [testTime])


   useEffect(()=>{
        inputFocus();
        // startTimer();
        wordsSpanRef[0].current.childNodes[0].className = 'current'; //target the 1st letter nd applying blinking effect.
   },[]);


  return (
    <>
    {/* <div>TypingBox</div> */}
    <UpperMenu countDown={countDown}/>
    {(testEnd) ? (<Stats
     wpm={calculateWPM()} 
      accuracy={calculateAcc()} 
       correctChars={correctChars}
       incorrectChars={incorrectChars}
       missedChars={missedChars}
      extraChars={extraChars}
      graphData={graphData}
      resetTest={resetTest}/>) : (<div className='type-box' onClick={inputFocus}> 
    {/*here we pass input focus to return the by default focus on text area & we use here ternery operator to 
    check wether the testended and countdown over nd reset to zero if reset then msg show test over in h1 tag. */}
            <div className='words'>
                {
                    wordsArray.map((word,index)=>(
                        <span className='word' ref={wordsSpanRef[index]}>
                            {
                                word.split('').map((char,charIndex)=>(
                                    <span key={charIndex}>{char}</span>
                                ))}
                        </span>
                    ))
                    }
            </div>
          </div>)
    }
          <input
            type='text'
            className='hidden-input'
            onKeyDown={handleUserInput}
            ref={inputRef}
          />
    </>

  )
}

export default TypingBox