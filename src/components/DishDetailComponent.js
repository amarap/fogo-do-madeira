import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


class DishDetail extends Component {
    
   renderDish(){
       const dish = this.props.dishClicked;
       if (dish != null)
           return (
               <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                              <Card>
                                <CardImg top width="100%" src={dish.image} alt={dish.name} />
                                <CardBody>
                                  <CardTitle>{dish.name}</CardTitle>
                                  <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                       </div>
                       <div className="col-6 col-md-5 m-1">
                            <h4>Comments</h4>
                            {
                                dish.comments.map((comm)=>{
                                    return (
                                        <div>
                                            <div key={comm.id}>
                                                <p><b>{comm.author}</b> --{comm.rating}-- </p>
                                                <p><em>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:           '2-digit'}).format(new Date(Date.parse(comm.date)))}</em></p>
                                                <p>{comm.comment}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                       </div>
                    </div>
               </div>
            );
            else
                return(
                    <div></div>
                );
   }
    
   render(){
       return (
          <div>{this.renderDish()}</div>
       );
   }         
}

export default DishDetail;