import React, {useState, useEffect} from 'react';
import {Chart} from 'primereact/chart';
import {TabView, TabPanel} from 'primereact/tabview';


export default function MailboxChart() {
    const [sendChartData, setSendChartData] = useState({});
    const [sendChartOptions, setSendChartOptions] = useState({});

    const [deliverabilityChartData, setDeliverabilityChartData] = useState({});
    const [deliverabilityChartOptions, setDeliverabilityChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const send = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [
                {
                    label: 'Send',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [100, 110, 130, 100, 120, 0]
                },
                {
                    label: 'Open',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    tension: 0.4,
                    data: [28, 48, 40, 19, 86]
                },
                {
                    label: 'Responded',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--cyan-500'),
                    tension: 0.4,
                    data: [5, 6, 2, 9, 12]
                },
                {
                    label: 'Bounced',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    tension: 0.4,
                    data: [0, 1, 2, 0, 2]
                }
            ]
        };
        const sendOptions = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
            }
        };

        const deliverability = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            datasets: [
                {
                    label: 'Send',
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    yAxisID: 'y',
                    tension: 0.4,
                    data: [100, 90, 80, 92, 98, 0]
                },
            ]
        };
        const deliverabilityOptions = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
            }
        };

        setSendChartData(send);
        setDeliverabilityChartData(deliverability);
        setSendChartOptions(sendOptions);
        setDeliverabilityChartOptions(deliverabilityOptions);
    }, []);

    return (
        <div className="surface-0 p-3 pb-4 shadow-1 border-round h-full">
            <TabView>
                <TabPanel header="Send">
                    <Chart type="line" data={sendChartData} options={sendChartOptions} />
                </TabPanel>
                <TabPanel header="Deliverability">
                    <Chart type="line" data={deliverabilityChartData} options={deliverabilityChartData} />
                </TabPanel>
            </TabView>
        </div>
    )
}
