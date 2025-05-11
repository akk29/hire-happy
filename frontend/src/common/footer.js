import React, { Component } from 'react'
import Config from '../main/config'

function footer_index(index,onclick,current){
    var limit = parseInt((Config.offset_size))
    var offset = (index - 1) * limit;    
    var buttonClass = `btn btn-primary`
    if(index === current){
        buttonClass = `btn btn-success`
    }
    return(
        <span key={index}>
        <button className={buttonClass} onClick={() => onclick(limit,offset)} >{index}</button> &nbsp;
        </span>
    )
}

export default class footer extends Component {
       
    render() {          
          var total = this.props.total
          var total_index = Math.ceil(total / parseInt(Config.offset_size))        
          var html = []        
          for (let index = 1; index <= total_index; index++) {
                html.push(footer_index(index,this.props.action,this.props.current))          
          }            
      return(        
      <div>{html}</div>
    )        
    }
}

