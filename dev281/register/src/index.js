import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function Title(props){
    return(
        <div>
            <h1>{props.title}</h1>
        </div>
    )   
}

function FirstName(props) {
    return(
        <div>
            {props.label} <br />
            <input name = {props.name} value = {props.value} onChange = {props.onChange}/>
        </div>
    )
}

function LastName(props) {
    return(
        <div>
            <br />{props.label} <br />
            <input name = {props.name} value = {props.value} onChange = {props.onChange}/>
        </div>
    )
}
function ActivitySelector(props) {
    return (
      <div>
        <br />Select Activity<br />
        <select onChange = {props.onChange}>
            { props.opts &&
                props.opts.map((opt, index) => (
                    <option value = {opt} > {opt} </option>
                ))
            }
        </select>
        <br />
      </div>
    )
  }

  function Checkbox(props) {
      return(
        <div>
      <input type="checkbox" 
             onChange = {props.onChange}
             className="restrictions" 
             name={props.name} 
             value={props.code} 
        />
        {props.code}) {props.label}
        </div>
      )
  }

  function TableHeader() {
    return (
      <tr>
          <th>Remove</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Activity</th>
          <th>Restrictions</th>
      </tr>
    )
  }

  function Post(props) {
      return (
          <tr>
              <td><button>Remove</button></td>
              <td>{props.fname}</td>
              <td>{props.lname}</td>
              <td>{props.activity}</td>
              <td>{props.restrictions}</td>
          </tr>
      )
  }

// function Post(props) {
//     var style = {
//         display: "flex"
//     }
//     return(
//         <div style = {style}>
//             <PostButton label = "x" handleClick = {props.removeItem}/>
//             <PostText text = {props.title}  width = "200px" />
//             <PostButton label = "+" handleClick = {props.incrementScore}/>
//             <PostText text = {props.score}  width = "20px" />
//             <PostButton label = "-" handleClick = {props.decrementScore}/>
//         </div>
//     )
// }

// function PostList(props){
//     return (
//         <ol>
//             {
//                 props.postList.map((item,index) =>
//                     <Post key = {index}
//                         title = {item.title}
//                         score = {item.score}
//                         incrementScore = {() => props.updateScore(index, 1)}
//                         decrementScore = {() => props.updateScore(index, -1)}
//                         removeItem = {() => props.removeItem(index)}
//                     />
//                 )
//             }
//         </ol>
//     )
// }

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fname: "", 
            lname: "",
            activity: "",
            ck_diet: false,
            ck_diabled: false,
            ck_medical: false,
            posts : [],
            value: "Science Lab"
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name      
        this.setState({[name]: value})
        console.log(this.state.ck_medical)
    }

    handleChange(event) {  
        this.setState({value: event.target.value})       
        console.log(this.state.value)
    }

    addItem(){
//         var itemsCopy = this.state.items.slice()
//         var truncatedString = this.state.value.substring(0,20);
//         itemsCopy.push({"title":truncatedString, "score":0})
//         itemsCopy.sort((a,b) => {
//             return b.score -  a.score;
//         })
//         this.setState({ items:itemsCopy, value: "" })
            console.log("Adding item...")
     }

//     updateScore(index, val) {
//         var itemsCopy = this.state.items.slice()
//         itemsCopy[index].score += val
//         itemsCopy.sort((a,b) => {
//             return b.score - a.score
//         })
//         this.setState({items:itemsCopy})
//     }

//     removeItem(index){
//         var itemsCopy = this.state.items.slice()
//         itemsCopy.splice(index,1);
//         itemsCopy.sort((a,b) => {
//             return b.score - a.score
//         })
//         this.setState({items:itemsCopy})
//     }

    render() {
        return(
            <form>
                <Title title = "React Registration" />
                <FirstName name = "fname"
                           label = "First Name" 
                           value = {this.state.fname} 
                           onChange = {this.handleInputChange.bind(this)} 
                />
                <LastName  name = "lname"
                           label = "Last Name" 
                           value = {this.state.lname} 
                           onChange = {this.handleInputChange.bind(this)} 
                />
                <ActivitySelector onChange = {this.handleChange.bind(this)} 
                                  opts = {["Science Lab","Swimming","Cooking","Painting"]} 
                />
                <br />Check all that apply<br />
                <Checkbox label = "Dietary Restrictions" 
                          code = "a"
                          name = "ck_diet"
                          onChange = {this.handleInputChange.bind(this)}
                />
                <Checkbox label = "Physical Disabilities" 
                          code = "b"
                          name = "ck_disabled"
                          onChange = {this.handleInputChange.bind(this)}
                />
                <Checkbox label = "Medical Needs" 
                          code = "c" 
                          name = "ck_medical"
                          onChange = {this.handleInputChange.bind(this)}
                />
                <br /><button id = "submit" onClick = { () => this.addItem()}>Submit</button>

                {/* <PostList postList = {this.state.items}
                          updateScore = {this.updateScore.bind(this)}  
                          removeItem = {this.removeItem.bind(this)}
                /> */}
                <h2>Course Registrations</h2>
                <table border="0" width="80%">
                <TableHeader />
                </table>
            </form>
            
        )
    }
}

ReactDOM.render(
    <Register />, 
    document.getElementById('root')
);

serviceWorker.unregister();
