import React, { useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
//am4core.useTheme(am4themes_animated);

function TrafficChart({ trafficChart }) {
    useEffect(() => {



        let chart = am4core.create("trafficChart", am4charts.XYChart);


        // Add data
        chart.data = trafficChart;
        console.log(chart.data)


        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 10;
        categoryAxis.renderer.labels.template.rotation = 45; // 레이블을 45도 회전

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.logarithmic = true;
        valueAxis.renderer.minGridDistance = 25;
        valueAxis.min = 16168357570;
        valueAxis.max = 20000000000;

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "name"; // 카테고리 사용
        series.tensionX = 0.8;
        series.strokeWidth = 3;

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color("#fff");
        bullet.circle.strokeWidth = 3;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        chart.cursor.xAxis = categoryAxis; // x축에 커서 사용
        chart.cursor.lineX.strokeWidth = 3;
        chart.cursor.lineX.fill = am4core.color("#000");
        chart.cursor.lineX.fillOpacity = 0.1;

        // Add scrollbar
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a guide
        let range = valueAxis.axisRanges.create();
        range.value = 90.4;
        range.grid.stroke = am4core.color("#396478");
        range.grid.strokeWidth = 1;
        range.grid.strokeOpacity = 1;
        range.grid.strokeDasharray = "3,3";
        range.label.inside = true;
        range.label.text = "Average";
        range.label.fill = range.grid.stroke;
        range.label.verticalCenter = "bottom";



        return () => {
            chart.dispose();
        };

    }, [trafficChart]);

    return (
        <div id="trafficChart" style={{ width: '100%', height: '300px' }}></div>
    )
}

export default TrafficChart;
