import React from 'react'
// we use these dependacy for our project will work optimum way
import { Line } from 'react-chartjs-2';
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useTheme } from '../context/ThemeContext';
// import { BorderColor, Label } from '@mui/icons-material';

//we have to register every thing we imported from the react-chartJs-2 

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Graph = ({graphData}) => {

    //we imported the theme from our theme context other than that the line, data, label, datasets, are the part of document 
    // is directly imported and used read them by ur own  
    const {theme} = useTheme();

  return (
    <>
      <Line
        data={{
          labels: graphData.map(i => i[0]),
          datasets: [
            {
              data: graphData.map(i => i[1]),
              label: 'wpm',
              borderColor: theme.textColor
            }
            // {
            //   data: [5, 6, 7, 8],
            //   label: 'graph2',
            //   borderColor: 'green'
            // },
          ],
        }}
      />
    </>
  );
}

export default Graph