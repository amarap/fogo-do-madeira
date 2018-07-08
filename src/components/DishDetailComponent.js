import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

const RenderDish = ({dishClicked}) => {
    return (
          <Card>
            <CardImg top width="100%" src={dishClicked.image} alt={dishClicked.name} />
            <CardBody>
              <CardTitle>{dishClicked.name}</CardTitle>
              <CardText>{dishClicked.description}</CardText>
            </CardBody>
          </Card>
    );
}

const RenderComments = ({comments}) => {
    return (
        <div>
          <h4>Comments</h4>
            <div>{
                comments.map((comm)=>{
                    return (
                            <div key={comm.id}>
                                <p><b>{comm.author}</b> --{comm.rating}-- </p>
                                <p><em>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:           '2-digit'}).format(new Date(Date.parse(comm.date)))}</em></p>
                                <p>{comm.comment}</p>
                            </div>
                    );
                })
            }</div>
        </div>
    );
}

const DishDetail = ({dishClicked}) => {
       if (dishClicked != null)
           return (
               <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dishClicked={dishClicked} />
                        </div>
                        <div className="col-6 col-md-5 m-1">
                            <RenderComments comments={dishClicked.comments} />
                       </div>
                    </div>
               </div>
            );
      else
          return(
               <div></div>
            );    
}

export default DishDetail;