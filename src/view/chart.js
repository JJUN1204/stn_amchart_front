import React, { useState, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../chart.css';
import DataRangePicker from '../component/DataRangePicker';
import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios from 'axios';
import DeviceFailureChart from '../component/DeviceFailureChartData';
import FailureChartData from '../component/FailureChartData';
import TrafficChart from '../component/TrafficChartData';
import DailyTrafficChart from '../component/DailyTrafficChart';


function Chart() {

    const [startDateToEndDate, setStartDateToEndDate] = useState({ startDate: '2024-04-23 00:00:00', endDate: '2024-04-25 00:00:00' });


    const [failureChartData, setfailureChartData] = useState([]);
    const [deviceFailureChart, setdeviceFailureChart] = useState([]);
    const [trafficChart, setTrafficChart] = useState([]);
    const [dailyTrafficChart, setDailyTrafficChart] = useState([]);
    const [title , setTitle] = useState('');

    const [isData , setIsData] = useState(true);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);

    useEffect(() => {
        console.log(startDateToEndDate);
        setStartDateToEndDate({
            "startDate": `${state[0].startDate.getFullYear()}-${zfill(state[0].startDate.getMonth().toString(), '0')}-${zfill(state[0].startDate.getDate().toString(), '0')} 00:00:00`,
            "endDate": `${state[0].endDate.getFullYear()}-${zfill(state[0].endDate.getMonth().toString(), '0')}-${zfill(state[0].endDate.getDate().toString(), '0')} 00:00:00`
        });

        getDeviceFailureChart();
        getfailureChartData();
        getTrafficChart();
        getDailyTrafficChart();

    }, [])


    const zfill = (item, char) => {
        return item.length === 1 ? char + item : item
    }


    const getDeviceFailureChart = async (title) => {
        try {
           //const response = await axios.get(`http://localhost:8081/getDeviceFailureChart?startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`);
            var url = `http://localhost:8081/getDeviceFailureChart?startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`;
            
            if (title) {
                url += `&title=${title}`;
            }
    
            const response = await axios.get(url);
            setdeviceFailureChart(response.data);

        } catch (e) {
            console.log(e);
        }
    };

    

    const getfailureChartData = async (title) => {
        console.log(startDateToEndDate);
    
        try {
            //const response = await axios.get(`http://localhost:8081/getFailureChart?startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`);
            var url = `http://localhost:8081/getFailureChart?startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`;
            
            if (title) {
                url += `&title=${title}`;
            }
    
            const response = await axios.get(url);

            setfailureChartData(response.data);
            
    
        } catch (e) {
            console.log(e);
        }
    };
    

    const getTrafficChart = async (title) => {
        

        try {

            var url = `http://localhost:8081/getTrafficChart?startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`;
            
            if (title) {
                url += `&title=${title}`;
            } 
            const response = await axios.get(url);
            setTrafficChart(response.data);


        } catch (e) {
            console.log(e);
        }
    };

    const getDailyTrafficChart = async () => {
        

        try {
            var url = `http://localhost:8081/getTrafficStatusChart?startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`;
            
            if (title) {
                url += `&title=${title}`;
            } else{
                return setIsData(false);
            }

            const response = await axios.get(`http://localhost:8081/getTrafficStatusChart?title=비피유&startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`);
            setDailyTrafficChart(response.data);
            

        } catch (e) {
            console.log(e);
        }
    };


   


    
    const handleSearch = async () => {
        try {
            
             getfailureChartData(title);
             getDeviceFailureChart(title);
             getTrafficChart(title);
             getDailyTrafficChart(title);
            
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <div>
            <div className="header">
                <h1>STN_CHART</h1>
            </div>
            <div className="searchbox">
                <DateRange
                    className='calender'
                    editableDateInputs={true}
                    onChange={(item) => {
                        setState([item.selection]);
                        setStartDateToEndDate({
                            "startDate": `${item.selection.startDate.getFullYear()}-${zfill(item.selection.startDate.getMonth().toString(), '0')}-${zfill(item.selection.startDate.getDate().toString(), '0')} 00:00:00`,
                            "endDate": `${item.selection.endDate.getFullYear()}-${zfill(item.selection.endDate.getMonth().toString(), '0')}-${zfill(item.selection.endDate.getDate().toString(), '0')} 00:00:00`
                        });
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    months={1}
                    direction="horizontal"
                />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="장비를 입력하세요" />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div className="dashboard">
                <div className="box">
                    <h2>장비별 장애 TOP10</h2>
                    <DeviceFailureChart deviceFailureChart={deviceFailureChart}></DeviceFailureChart>
                </div>
                <div className="box">
                    <h2>장애 등급별 TOP10</h2>
                    <FailureChartData failureChartData={failureChartData}></FailureChartData>
                </div>
                <div className="box">
                    
                    <h2>인터페이스별 트래픽 TOP10</h2>
                    <TrafficChart trafficChart={trafficChart}></TrafficChart>
                        
                    
                </div>
                <div className="box">
                    <h2>일별 트래픽 추이</h2>
                    <DailyTrafficChart dailyTrafficChart={dailyTrafficChart}></DailyTrafficChart>
                </div>
            </div>
        </div>
    );
}

export default Chart;
