import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


function RenderComments({comments}) {
    var retComments;
    if(comments != null){

        retComments = comments.map((comment) => {                
            var newStr = Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))
            return (
                <div>
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
    return retComments;
}

function RenderDish({dish}) {
    if(dish != null){
        return (
            <div className="row">
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle><h3>{dish.name}</h3></CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>,
                <div className="col-12 col-md-5 m-1">
                    <p>
                        <h3>Comments</h3>
                        <text className='ul' className="list-unstyled">
                            {<RenderComments comments={dish.comments} />}
                        </text>
                    </p>
                </div>
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
            <RenderDish dish={props.dish} />
        </div>
    );        
}



export default DishDetail;