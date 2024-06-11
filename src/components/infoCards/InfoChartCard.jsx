import { Chart } from 'primereact/chart';

export default function InfoChartCard(props) {
    // eslint-disable-next-line react/prop-types
    const {title, image, value, whole} = props;

    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
        labels: ['A', 'B'],
        datasets: [
            {
                data: [100 - value, value],
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-500'),
                    documentStyle.getPropertyValue('--green-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--blue-400'),
                    documentStyle.getPropertyValue('--green-400')
                ]
            }
        ]
    };
    const options = {
        cutout: '80%',
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className='info_card_container'>
            <div className='info_card_header'>
                {title}
            </div>
            <div className='info_chart_card_content'>
                <div className='info_chart_card_content_left'>
                    <div className='info_card_image'>
                        <i className={`pi ${image}`} style={{ fontSize: '2.3rem' }}></i>
                    </div>
                    <div className='info_card_value'>
                        {whole ? `${((value / whole) * 100).toFixed(0)}% (${value})` : value}
                    </div>
                </div>
                <div className='info_chart_card_content_right'>
                    <div className="card flex justify-content-center">
                        <Chart type="doughnut" data={data} options={options} className="w-10rem" />
                    </div>
                </div>
            </div>
        </div>
    )
}