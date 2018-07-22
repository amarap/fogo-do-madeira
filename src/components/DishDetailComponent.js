import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const RenderDish = ({dishClicked}) => {
    return (
          <Card>
            <CardImg top width="100%" src={baseUrl + dishClicked.image} alt={dishClicked.name} />
            <CardBody>
              <CardTitle>{dishClicked.name}</CardTitle>
              <CardText>{dishClicked.description}</CardText>
            </CardBody>
          </Card>
    );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }
    render(){
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><b>Submit Comment</b></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group m-2">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control" validators={{required}}>
                                    <option>--</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    messages={{
                                        required: 'Please select a rating value ',
                                    }}
                                 />
                            </Row>
                            <Row className="form-group m-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name" placeholder="Name" className="form-control" 
                                validators={{minLength: minLength(3), maxLength: maxLength(15)}} /> 
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}
                                 />
                            </Row>
                            <Row className="form-group m-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" 
                                validators={{required}}/> 
                                <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show="touched"
                                    messages={{
                                        required: 'Please type your comment ',
                                    }}
                                 />
                            </Row>
                            <Row className="form-group m-2">
                                    <Button type="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const RenderComments = ({comments, addComment, dishId}) => {
    return (
        <div>
            <h4>Comments</h4>
            <div>{
                comments.map((comm)=>{
                    return (
                            <div key={comm.id}>
                                <p><em>{comm.comment}</em></p>
                                <p>-- <b>{comm.author}</b>, {comm.date}</p>
                            </div>
                    );
                })
            }</div>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}

const DishDetail = (props) => {
       if (props.isLoading)
           return (
            <div className="container">
               <div className="row">
                    <Loading />
               </div>
            </div>
           );
        else if (props.errmsg)
            return (
                <div className="container">
                   <div className="row">
                        <h4>{props.errmsg}</h4>
                   </div>
                </div>
            );   
       else if (props.dishClicked != null)
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
                            <RenderComments 
                                comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dishClicked.id}
                            />
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