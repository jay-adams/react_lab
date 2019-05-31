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
            <input name = {props.name} type = {props.type} value = {props.value} onChange = {props.onChange}/>
        </div>
    )
}

function LastName(props) {
    return(
        <div>
            <br />{props.label} <br />
            <input name = {props.name}  type = {props.type} value = {props.value} onChange = {props.onChange}/>
        </div>
    )
}
function ActivitySelector(props) {
    return (
      <div>
        <br />Select Activity<br />
        <select onChange = {props.onChange} value={props.defaultValue}>
            { props.opts &&
                props.opts.map((opt, index) => (
                    <option key = {index} value = {opt} > {opt} </option>
                ))
            }
            
        </select>
        <br />
        <br />Check all that apply<br />
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
            checked = {props.checked}
            value={props.code} 
    />
    {props.code}) {props.label}
    </div>
    )
}

function PostList(props){
    let style = {
        minWidth: "60%",
        width: "80%",
        textAlign: "center",
        border: "0" 
    }
    return (
        <div>
            <h2>Course Registration</h2>
            <table style = {style} >
            <tr>
                <th>Remove</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Activity</th>
                <th>Restrictions</th>
            </tr>
                <tbody>
                {props.postList.map( (item,i) => {
                     return (
                      <tr>
                        <th><button onClick={ () => props.removeItem(i) }>X</button></th>
                        <th>{item.fname}</th>
                        <th>{item.lname}</th>
                        <th>{item.activity}</th>
                        <th>{item.restrictions}</th>
                     </tr>
                    )             
                })}
                </tbody>
            </table>  
        </div>
    )
}
 
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fname: "", 
            lname: "",
            activity: "Science Lab",
            ck_diet: false,
            ck_disabled: false,
            ck_medical: false,
            posts : [],
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name      
        this.setState({[name]: value})
    }

    handleChange(event) {  
        this.setState({activity: event.target.value})       
        console.log(this.state.activity)
    }

    addItem(){
        var postsCopy = this.state.posts.slice()
        var newReg = {"fname":this.state.fname,
                    "lname":this.state.lname,
                    "activity":this.state.activity,
                    "restrictions":this.restrictionsString()}
        postsCopy.push(newReg)
        this.setState({ posts:postsCopy}, () => console.log(this.state.posts))
        this.resetForm()    
     }

    restrictionsString() {
        var restrictions = ""
        if(this.state.ck_diet) restrictions = restrictions + "a"
        if(this.state.ck_disabled) restrictions = restrictions + "b"
        if(this.state.ck_medical) restrictions = restrictions + "c"
        return restrictions        
    }

    removeItem(index){
        var postsCopy = this.state.posts.slice()
        postsCopy.splice(index,1);
        postsCopy.sort((a,b) => {
            return b.score - a.score
        })
        this.setState({posts:postsCopy})
    }

    resetForm() {
        this.setState({fname:"", 
                    lname:"", 
                    activity:"Science Lab",
                    ck_diet: false,
                    ck_disabled: false,
                    ck_medical: false 
                    })
      }

    render() {
        return(
            <div>
                <Title title = "React Registration" />
                <FirstName name = "fname"
                           label = "First Name" 
                           type = "input" 
                           value = {this.state.fname} 
                           onChange = {this.handleInputChange} 
                />
                <LastName  name = "lname"
                           label = "Last Name"
                           type = "input" 
                           value = {this.state.lname} 
                           onChange = {this.handleInputChange} 
                />
                <ActivitySelector onChange = {this.handleChange.bind(this)} 
                                  opts = {["Science Lab","Swimming","Cooking","Painting"]} 
                                  name = "activity"
                                  defaultValue = "Science Lab"
                />
                <Checkbox label = "Dietary Restrictions" 
                          code = "a"
                          name = "ck_diet"
                          checked = {this.state.ck_diet}
                          onChange = {this.handleInputChange.bind(this)}
                />
                <Checkbox label = "Physical Disabilities" 
                          code = "b"
                          name = "ck_disabled"
                          checked = {this.state.ck_disabled}
                          onChange = {this.handleInputChange.bind(this)}
                />
                <Checkbox label = "Medical Needs" 
                          code = "c" 
                          name = "ck_medical"
                          checked = {this.state.ck_medical}
                          onChange = {this.handleInputChange.bind(this)}
                />
                <button id = "submit" onClick = { () => this.addItem()}>Submit</button>

                
                <PostList postList = {this.state.posts}
                    removeItem = {this.removeItem.bind(this)}
                />
                
            </div>
        )
    }
}

ReactDOM.render(
    <Register />, 
    document.getElementById('root')
);

serviceWorker.unregister();
