import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';



export default function Performance(){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
      );

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Orgname Node Performance',
          },
        },
      };

    const labels = ['1st', '2nd', '3rd', '4th', '6th', '7th', '8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th','31st'];
    const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Monthly Credit Checks (per million)',
            data: [1,2,2,2,3,2,1,4,0.5,3,4,5,3,6,7,2,3,4,5,3,4,6,7,7,7,8.5,5,6,4],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
    ],
    };

    return (
        <div>
            <div className="container bg-white m-auto rounded-md shadow-md p-2 pl-5 pr-5">
                <span className="text-3xl font-semibold text-green-800">Network Performance</span>
                <div className='flex flex-row mr-10 ml-10 justify-between'>
                    <div className='flex flex-col border border-orange-200 w-1/4 p-5 rounded-lg bg-gray-50 shadow-md mt-5 mb-5 m-3 items-center'>
                        <span className='font-bold text-lg'>Operational Nodes</span>
                        <span>87</span>
                    </div>
                    <div className='flex flex-col border border-orange-200 w-1/4 p-5 rounded-lg bg-gray-50 shadow-md mt-5 mb-5 m-3 items-center'>
                        <span className='font-bold text-lg'>Total Appraisals</span>
                        <span>66,000,000</span>
                    </div>
                    <div className='flex flex-col border border-orange-200 w-1/4 p-5 rounded-lg bg-gray-50 shadow-md mt-5 mb-5 m-3 items-center'>
                        <span className='font-bold text-lg'>Monitored Borrowers</span>
                        <span>5,000,000</span>
                    </div>
                </div>
                <span className="text-green-700 text-xl">Credit History Checks <sub className="text-black text-lg">(August)</sub></span>
                <div>
                    <Line
                        datasetIdKey='id'
                        data={data}
                        />
                </div>
            </div>
        </div>
    );
}