import React, { useEffect } from 'react';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function FailureChartData({ failureChartData }) {

    // 차트 생성 및 설정 함수
    useEffect(() => {

        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("failureChartData", am4charts.PieChart);

        // Add data
        chart.data = failureChartData;

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "name";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        chart.hiddenState.properties.radius = am4core.percent(0);

        return () => {
            chart.dispose();
          };


    }, [failureChartData]); // 한 번만 실행되어야 함


    return (
        <>
            <div id="failureChartData" style={{ width: '100%', height: '300px' }}></div>
        </>
    )
}

export default FailureChartData;