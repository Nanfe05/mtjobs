import React, {useState} from 'react';

import Card from './cards/card';
import {connect} from 'react-redux';

import {ChangeName, ChangeObjetive} from '../../../store/actions/appActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        hidden={value !== index}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    );
  }

const Home = (props) =>{
    const [currentTab,setCurrentTab] = useState(0);

        return(
            <div className='home'>
                <SwipeableViews index={currentTab} className='CustomSwipe'>
                    <TabPanel index={0} value={currentTab}>     
                        <Card >
                            <TextField 
                                label='Ingresa tu Nombre:'
                                placeholder='Felipe'
                                onChange={(e)=>{
                                    props.ChangeName(e.target.value);
                                }}
                                value={props.user_name}
                            />
                            <Button
                                onClick={()=>{
                                    setCurrentTab(1);
                                }}
                                className='MtJBoton'
                            >Continuar</Button>

                        </Card>
                    </TabPanel>
                    <TabPanel index={1} value={currentTab}>
                        <Card>
                        <Button
                                onClick={()=>{
                                    props.ChangeObjetive('job');
                                    setCurrentTab(2);
                                }}
                                className='MtJBoton'
                            >Busco Trabajo</Button>
                        <Button
                                onClick={()=>{
                                    props.ChangeObjetive('team');
                                    setCurrentTab(2);
                                }}
                                className='MtJBoton'
                            >Busco Equipo</Button>
                        </Card>
                    </TabPanel>
                    <TabPanel index={2} value={currentTab}>
                        <Card>
                        HAHAHA
                        </Card>
                    </TabPanel>
                </SwipeableViews>
            </div>
        );
}

const mapStateToProps = state =>({
    user_name: state.user_name
})

export default connect(mapStateToProps,{
    ChangeName,
    ChangeObjetive
})(Home);