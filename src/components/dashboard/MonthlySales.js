import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {white, pink600, pink500} from 'material-ui/styles/colors';
import {BarChart, Bar, ResponsiveContainer, XAxis, Legend, Tooltip} from 'recharts';
import GlobalStyles from '../../styles';

const MonthlySales = (props) => {

  const styles = {
    paper: {
      backgroundColor: pink600,
      height: 250
    },
    div: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: 200
    },
    header: {
      color: white,
      backgroundColor: pink500,
      padding: 10
    }
  };

  return (
    <Paper style={styles.paper}>
      <div style={{...GlobalStyles.title, ...styles.header}}>Monthly Sales</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data} >
            <Bar dataKey="uv" fill={pink500}/>
            <XAxis dataKey="name" stroke="none" tick={{fill: white}}/>
            <Legend />
            <Tooltip/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

MonthlySales.propTypes = {
  data: PropTypes.array
};

export default MonthlySales;
