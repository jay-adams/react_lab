import React, { Component } from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import { thisExpression, tsNonNullExpression } from '@babel/types';

const numberOfQuestions = 10
const url = "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&difficulty=easy&type=multiple"
const title = "React Trivia"

function DisplayTitle(props) {
  return (
    <div>
      <h1  id="title">{ props.title }</h1>
    </div>
  )
}

function stripHTML(text) {
  return text
      .replace(/&amp;/g,"&")
      .replace(/&lt;/g,"<")
      .replace(/&gt;/g,">")
      .replace(/&quot;/g,'"')
      .replace(/&#039;/g,"'");
}

function Question(props){
  if(!props.gameover){
  var question = props.arr[props.question][1]
    var answers = [ 
      props.arr[props.question][2],
      props.arr[props.question][3],
      props.arr[props.question][4],
      props.arr[props.question][5]
    ]
    answers = shuffleAnswers(answers) 
      return(
        <div>
          <div id = "question">
            { "Question #: " + props.question }
            <br /><br />
            { "Category: " + props.arr[props.question][0] } 
            <br /><br />
            { "Question: " + question }    
          </div>
          <div className = "question-block">
            <button onClick = {() => props.handleClick(answers[0]) }> { answers[0] }</button>
            <button onClick = {() => props.handleClick(answers[1]) }> { answers[1] }</button>
            <button onClick = {() => props.handleClick(answers[2]) }> { answers[2] }</button>
            <button onClick = {() => props.handleClick(answers[3]) }> { answers[3] }</button>
          </div>
        </div>
      )
  } else {
    return(
      <div>
        GAME OVER!
      </div>
    )
  }
}  

function Scoreboard(props){
    return(
      <div id = "scorecard">
        Correct: { props.correct }
        <br />
        Incorrect: { props.incorrect } 
      </div>) 
}

function shuffleAnswers(answers) {
  var array = [].concat(answers);
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

class App extends React.Component {
    constructor(props){
      super(props) 
      var arr = []
      for(let i = 0; i < 10; i++ ) {
          arr.push(new Array(6).fill("placeholder"))
      }          
      this.state = { 
        data: arr,
        question: 0, 
        correct: 0, 
        incorrect: 0,
        isLoading: false,
        gameover: false
      }
      this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
      this.setState({ isLoading: true})
      var arr = [] 
      var triviaArray = []
      fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
        var trivia = data.results;
        
        for(let i = 0; i < 10; i++) {
          arr[0] = stripHTML(trivia[i].category)
          arr[1] = stripHTML(trivia[i].question)
          arr[2] = stripHTML(trivia[i].correct_answer)
          arr[3] = stripHTML(trivia[i].incorrect_answers[0])
          arr[4] = stripHTML(trivia[i].incorrect_answers[1])
          arr[5] = stripHTML(trivia[i].incorrect_answers[2])
          triviaArray.push(arr)
          arr = []
        }
        console.log(triviaArray)
        
      })
      .then(data => this.setState({ isLoading: false, data: triviaArray}));
    }

    handleClick(answer){
      var correctAnswer =  this.state.data[this.state.question][2]
      if(!this.state.gameover) {
        if(answer === correctAnswer) {
          this.setState({
            question: this.state.question + 1, 
            correct: this.state.correct + 1 
          })
        } else {
          this.setState({
            question: this.state.question + 1, 
            incorrect: this.state.incorrect + 1 
          })
        }
        if(this.state.question >= numberOfQuestions - 1) {
          this.setState({gameover: true})
        }
      } 
    }

    reset() {
      this.componentDidMount()
      this.setState({
        question: 0, 
        correct: 0, 
        incorrect: 0,
        gameover: false 
      })
    }

    render() {
      if (this.state.isLoading) {
        return <p>Loading ...</p>; 
      } else {
        return(
          <div id = "gameboard">
            <DisplayTitle title = { title } />
            <div id = "wrapper">
            <section id = "left">              
              <Question handleClick = {this.handleClick} arr = {this.state.data} question = {this.state.question} gameover = {this.state.gameover} />
              <button id="reset" onClick = { () => this.reset()}>Reset</button>
            </section>
            <section id = "right">
              <Scoreboard correct = { this.state.correct } incorrect = { this.state.incorrect } />
            </section>
            </div>
          </div>
        )
      }
    }
}
export default App;
//var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");