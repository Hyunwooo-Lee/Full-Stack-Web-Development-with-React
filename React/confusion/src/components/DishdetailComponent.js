import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({comments}) {
    var retComments;
    if(comments != null){

        retComments = comments.map((comment) => {                
            var newStr = Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))
            return (                              
                <p>
                    <text className='ul' className="list-unstyled"></text>
                    <div>
                        <p tag="li">
                            {comment.comment}{"\n"}
                        </p>
                        <p tag="li">
                            -- {comment.author}, {newStr}
                        </p>
                    </div>
                </p>
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
        </div>        
    )
}

function RenderDish({dish}) {
    if(dish != null){
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
    else {
        return (
            <div></div>
        );
    }        
}

const DishDetail = (props) => {
    console.log('DishDetail Component render is invoked');
    
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
                <RenderComments comments={props.comments} />               
            </div>
        </div>
    );        
}



export default DishDetail;