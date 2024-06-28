import React, { useState, useEffect } from 'react'
// import { getLocalStorage } from '../../utils/config'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../Admin/app-widget-summary';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import AppWebsiteVisits from './app-website-visits';
import './user.css';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Chart from 'react-apexcharts';
export default function Dboard() {

	const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const [TotalRevenue, setTotalRevenue] = useState(null);
  const [labels, setLabels] = useState([]);
  const [Percentage, setPercentage] = useState(null);
  const [series, setSeries] = useState(null);
  // const [jsonData, setJsonData] = useState(null);
  
// Hàm để tạo mảng các ngày trong khoảng từ startDate đến endDate
const getDatesInRange = (start, end) => {
	const dates = [];
	let currentDate = new Date(start);

  while (currentDate <= new Date(end)) {
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`; // Use YYYY-MM-DD format

    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
  };
  const convertDateFormat = (dateString) => {
	return dateString.replace(/\//g, '-');
  };
	const handleStartDateChange = (date) => {

		const formattedDate = format(date, 'yyyy/MM/dd');
		const convertStartDate = convertDateFormat(formattedDate);
    setStartDate(convertStartDate);
	  };
	
	  const handleEndDateChange = (date) => {
		const formattedDate = format(date, 'yyyy/MM/dd');
    
		if (formattedDate >= startDate || !startDate) {
			const convertEndDate = convertDateFormat(formattedDate);
    
			setEndDate(convertEndDate);
		  } else {
			console.log("lỗi date");
			// Xử lý trường hợp người dùng chọn ngày kết thúc nhỏ hơn ngày bắt đầu ở đây
		  }
		
	  };



	useEffect(() => {
		if (startDate && endDate) {
		  const datesInRange = getDatesInRange(startDate, endDate);
		  setLabels(datesInRange);
		  console.log("rrrrrrrrrrr",labels);
		}
	  }, [startDate, endDate]);
  useEffect(() => {
	const token = localStorage.getItem('token');
	
	fetch(`/admin/total`, {
		method: "GET",
		headers: { 'Authorization': `Bearer ${token}` }
		
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
		throw new Error("Error from backend");
	}).then(data => {
		setTotalRevenue(data);
		
	}).catch(error => {
		console.error('Error total', error);
	});
}, []);

const [chartData, setChartData] = useState({
  labels: [],
  series: []
});

const [pieChartData, setPieChartData] = useState({
  series: []
});

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`/book/cinema/daily-revenue?startDate=${startDate}&endDate=${endDate}`, {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log("Dữ liệu thống kê:", data);

      // Chuyển đổi dữ liệu thành mảng jsonData như yêu cầu
      const jsonData = data.map(item => [
        item[0], // cinemaName
        item[1], // bookingDate
        item[2]
      ]);

      console.log("jsonData:", jsonData);

      // Chuẩn bị dữ liệu cho biểu đồ đường
      const preparedChartData = prepareChartData(jsonData);
      setChartData({
        labels: [...new Set(jsonData.map(item => item[1]))],
        series: preparedChartData
      });

      // Chuẩn bị dữ liệu cho biểu đồ tròn
      const preparedPieChartData = preparePieChartData(jsonData);
      setPieChartData({
        series: preparedPieChartData
      });

    } else {
      throw new Error("Error from backend");
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu thống kê:', error);
    // Xử lý lỗi và thông báo cho người dùng nếu cần
  }
};

// Chuẩn bị dữ liệu cho biểu đồ đường
const prepareChartData = (data) => {
  const labels = [...new Set(data.map(item => item[1]))];
  console.log("aaaaaaaaa",labels);
  const series = {};

  data.forEach(item => {
    const cinemaName = item[0];
    const date = item[1];
    const revenue = item[2];

    if (!series[cinemaName]) {
      series[cinemaName] = {
        name: cinemaName,
        type: 'line',
        data: Array(labels.length).fill(null)
      };
    }

    const index = labels.indexOf(date);
    series[cinemaName].data[index] = revenue;
  });

  return Object.values(series);
};

// Chuẩn bị dữ liệu cho biểu đồ tròn
const preparePieChartData = (data) => {
  const series = data.reduce((accumulator, item) => {
    const [cinemaName, _, revenue] = item;
    if (!accumulator[cinemaName]) {
      accumulator[cinemaName] = 0;
    }
    accumulator[cinemaName] += revenue;
    return accumulator;
  }, {});

  return Object.entries(series).map(([cinemaName, totalRevenue]) => ({
    label: cinemaName,
    value: totalRevenue,
  }));
};

// Cấu hình cho biểu đồ đường
const options = {
  chart: {
    type: 'line',
    height: 350,
  },
  colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
  xaxis: {
    type: 'datetime',
    categories: chartData.labels,
  },
  stroke: {
    curve: 'smooth',
  },
};

// Cấu hình cho biểu đồ tròn
const pieChartOptions = {
  chart: {
    type: 'pie',
    height: 250,
  },
  labels: pieChartData.series.map(item => item.label),
};


	return (
		<Container maxWidth="xl">
		  <Typography variant="h4" sx={{ mb: 5 }}>
			Hi, Welcome back 👋
		  </Typography>

		  
		  <Grid container spacing={3}>
		 
			<Grid xs={12} sm={6} md={3}>
			  <AppWidgetSummary
				title="Tổng doanh thu"
				total={TotalRevenue}
				// total={199000000}
				color="success"
				icon={<CurrencyExchangeIcon />}
			  />
			</Grid>
	
			 
			<Grid item xs={12} sm={6} md={8}>
			
			<form onSubmit={(e) => { e.preventDefault(); }} className="flex flex-wrap gap-4 justify-center">
      <div className="flex items-center space-x-4">
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={handleStartDateChange}
          className="text-black border-2 rounded-md border-slate-600 cursor-pointer h-[3rem] px-3"
          placeholderText="Chọn ngày bắt đầu"
        />
      </div>

      <div className="flex items-center space-x-4">
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={handleEndDateChange}
          className="text-black border-2 rounded-md border-slate-600 cursor-pointer h-[3rem] px-3"
          placeholderText="Chọn ngày kết thúc"
        />
		 
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={handleSubmit} className='p-3 bg-orange-400 rounded-md font-semibold tracking-wide h-[3rem]'>
          Thống kê
        </button>
      </div>
    </form>
</Grid>
<Grid xs={12} md={6} lg={8}>
{labels.length > 0 &&(
          <AppWebsiteVisits
            title="Website"
            chart={{
              labels: labels,
              series: [
                {
                  name: 'Cinema QT',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Cienam SV',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Cinema HBT',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        )}
        </Grid>

{/* <Grid xs={12} md={6} lg={8}>
      <Chart options={options} series={chartData.series} type="line" height={250}  />
    </Grid> */}
      {/* Biểu đồ tròn */}
      <Grid item xs={12} md={6} lg={4}>
        <Chart options={pieChartOptions} series={pieChartData.series.map(item => item.value)} type="pie" height={250}  />
      </Grid>
			
	
	
	
		  </Grid>
		  
		</Container>
	  );
    
}
