import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                                <p>{comm.date}</p>
                                <p>{comm.comment}</p>
                            </div>
                    );
                })
            }</div>
        </div>
    );
}

const DishDetail = (props) => {
       if (props.dishClicked != null)
           return (
               <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dishClicked.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dishClicked.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dishClicked={props.dishClicked} />
                        </div>
                        <div className="col-6 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
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