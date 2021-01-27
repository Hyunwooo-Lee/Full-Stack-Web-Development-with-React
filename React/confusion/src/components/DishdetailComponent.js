import react, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {      
        }
        console.log('DishDetail Component constructor is invoked');
        
    }

    componentDidMount() {
        console.log('DishDetail Component componentDidMount is invoked');
    }

    renderComments(comments) {
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

    renderDish(dish) {
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
                                {this.renderComments(dish.comments)}
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

    render() {
        console.log('DishDetail Component render is invoked');
        console.log(this.props.dish)
        
        return (  
            <div className="container">
                {this.renderDish(this.props.dish)}
            </div>
        );
        
    }

}

export default DishDetail;