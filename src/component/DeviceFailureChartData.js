import React, { useEffect } from 'react';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function DeviceFailureChart({ deviceFailureChart }) {

    useEffect(() => {

        if (deviceFailureChart.length === 0) return; // 데이터가 없으면 종료

        let chart = am4core.create("deviceFailureChart", am4charts.XYChart);

        // Add data
        chart.data = deviceFailureChart;
        

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name"; // 변경된 부분
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.rotation = -45; // 레이블을 45도 회전

        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
        });

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value"; // 변경된 부분
        series.dataFields.categoryX = "name"; // 변경된 부분
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        return () => {
            chart.dispose();
          };

    }, [deviceFailureChart]);


    return (
        <>
            <div id="deviceFailureChart" style={{ width: '100%', height: '300px' }}></div>
        </>
    )
}

export default DeviceFailureChart;