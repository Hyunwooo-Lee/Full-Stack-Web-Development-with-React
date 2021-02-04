import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
const required = (val) => val && val.length;
const maxLength =  (len) => (val) => !(val) || (val.length <= len);
const minLength =  (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props)  {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();        
        this.props.addComment(this.props.dishId, values.rating, values.yourname, values.message);
    }


    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg mr-2"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" xs={12}>Rating</Label>
                                <Col xs={12}>
                                    <Control.select model=".rating" id="rating"  name="rating"
                                        defaultValue = {1}
                                        className="form-control" >                                        
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" xs={12}>Last Name</Label>
                                <Col xs={12}>
                                    <Control.text model=".yourname" id="yourname"  name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors 
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be  greater than 2',
                                            maxLength: 'Must be 15 charactersor less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea model=".message" id="message"  name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">                               
                                <Col xs={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>            
        )
    }
}

function RenderComments({comments, addComment, dishId}) {
    var retComments;
    if(comments != null){

        retComments = comments.map((comment) => {                
            var newStr = Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))
            return (                              
                <div key={comment.id}>
                    <p className='ul list-unstyled'></p>                    
                    <p tag="li">
                        {comment.comment}{"\n"}
                    </p>
                    <p tag="li">
                        -- {comment.author}, {newStr}
                    </p>                    
                </div>
            );
        });
    }
    else {
        retComments = <div></div>;
    }
    return (            
        <div className="col-12 col-md-5 m-1">  
            <h3>Comments</h3>
            {retComments}
            {<CommentForm dishId={dishId} addComment={addComment} />}
        </div>        
    )
}

function RenderDish({dish}) {
    return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle><h3>{dish.name}</h3></CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null) 
        return (  
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dish.id} />                                                     
                </div>
            </div>
        );
    else {
        return (
            <div></div>
        );
    }     
}



export default DishDetail;