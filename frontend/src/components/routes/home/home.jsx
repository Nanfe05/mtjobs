import React from 'react';

import Card from './cards/card';
import {connect} from 'react-redux';

import {ChangeName} from '../../../store/actions/appActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SwipeableViews from 'react-swipeable-views';


const Home = (props) =>{
    console.log(props);
        return(
            <div className='home'>
                <SwipeableViews>
                    <Card>
                        <TextField 
                            label='Ingresa tu nickName:'
                            placeholder='Felipe'
                            onChange={(e)=>{
                                props.ChangeName(e.target.value);
                            }}
                            value={props.user_name}
                        />
                        <Button
                            onClick={()=>{

                            }}
                        >Continuar</Button>

                    </Card>
                    <Card>
                        lkdjfsaj
                    </Card>
                </SwipeableViews>
            </div>
        );
}

const mapStateToProps = state =>({
    user_name: state.user_name
})

export default connect(mapStateToProps,{
    ChangeName
})(Home);